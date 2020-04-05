import { promisify } from 'util';
import { exec } from 'child_process';
import Telegraf, { ContextMessageUpdate } from 'telegraf';

/**
 * To create a new bot simply start a conversatin with @BotFather
 * on Telegram. He'll respond with an API token you can use.
 */
const token: string | undefined = process.env.BOT_TOKEN;
const username: string | undefined = process.env.BOT_USERNAME;
if (!token || !username) {
  throw new Error('Telegram token and username must be provided.');
}

/**
 * List of users who are considered administrators.
 *
 * Used by isMessageFromAnAdmin to figure out if a message
 * was sent from a Telegram user we treat as an administrator.
 */
const admins: { [id: number]: string; } = {
  1077246646: 'Michael McMillan',
};

/**
 * How each site is deployed. For the deploy command to work
 * the site you want to deploy has to have an entry below.
 */
const deployCommands: { [hostname: string]: string; } = {
  'coronastatus.it': 'app@coronastatus.it /srv/scripts/deploy-prod.sh',
  'coronastatus.ro': 'app@coronastatus.ro /srv/scripts/deploy-prod.sh' 
}

/**
 * Checks if the message was sent from somebody we trust.
 */
function isMessageFromAnAdmin(ctx: ContextMessageUpdate): boolean {
  if (!ctx.message?.from) {
    return false;
  }
  const userId = ctx.message.from.id;
  const isAdmin = userId in admins;
  if (!isAdmin) {
    console.info(`${userId} is not an admin.`);
  }
  return isAdmin;
}

/**
 * Checks if the message was started with an @ mention of this bot.
 * We treat this as a "command" for convenience.
 */
function isBotMentioned(ctx: ContextMessageUpdate): boolean {
  if (!ctx.message?.text) {
    return false;
  }
  return ctx.message.text.startsWith(`@${username} `);
}

/**
 * Executes ssh (remote shell) from the machine the bot is runnig on.
 * In production we run the bot on BustByte's server, which has a keypair
 * that gives it access to all the machines in the DigitalOcean cluster.
 */
async function ssh(args: string): Promise<string> {
  const execPromise = promisify(exec);
  const command = `ssh ${args}`;
  const { stdout, stderr } = await execPromise(command);
  if (stderr) {
    return 'Command failed.';
  } else {
    const [firstLine,] = stdout.split('\n');
    return firstLine;
  }
}

/**
 * Used by the deploy command to figure out which sites to deploy to.
 * It looks at all the words in the message and returns the words that
 * are in the deployCommands dictionary.
 *
 * "foo bar coronastatus.it coronastatus.ro"
 * => ["coronastatus.it", "coronastatus.ro"]
 */
function parseHostnamesFromMessage(ctx: ContextMessageUpdate): Array<string> {
  if (!ctx.message?.text) {
    return [];
  }
  const words = ctx.message.text.split(' ');
  if (words.includes('all')) {
    const allHostnames = Object.keys(deployCommands);
    return allHostnames;
  }
  const hostnames = words.filter(hostname => hostname in deployCommands);
  return Array.from(new Set(hostnames));
}

/**
 * Triggers an ssh command if the hostname is present in the deployCommands.
 * Usage: @coronastatusrobot deploy coronastatus.it
 */
async function deployCommand(ctx: ContextMessageUpdate): Promise<void> {
  if (!isBotMentioned(ctx) || !isMessageFromAnAdmin(ctx)) {
    return;
  }

  let replyLines = [];
  for (const hostname of parseHostnamesFromMessage(ctx)) {
    const message = await ssh(deployCommands[hostname]);
    replyLines.push(`${hostname} deployment: ${message}`);
  }
  ctx.reply(replyLines.join('\n'));
}

/**
 * Register webhooks and listernes with Telegram's API.
 */
const bot = new Telegraf(token, { username });
bot.hears(/deploy/g, deployCommand);
bot.launch();
