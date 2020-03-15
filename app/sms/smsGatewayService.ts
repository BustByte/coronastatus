import fetch from 'node-fetch';

export class SmsGatewayService {
  username: string;
  password: string;
  shouldSendSms: boolean;

  constructor(username: string, password: string, shouldSendSms: boolean) {
    this.username = username;
    this.password = password;
    this.shouldSendSms = shouldSendSms;
  }

  createEndpointString(recipientNumber: string, messageContent: string) {
    return `https://sveve.no/SMS/SendMessage?user=${this.username}&passwd=${
      this.password
    }&to=${recipientNumber}&msg=${encodeURIComponent(
      messageContent
    )}&from=Corona`;
  }

  async sendMessageToNumber(recipientNumber: string, messageContent: string) {
    if (!this.shouldSendSms) {
      console.info(`Not sending SMS: ${recipientNumber}{${messageContent}}`);
      return {
        success: true
      };
    }
    const endpointUrl = this.createEndpointString(
      recipientNumber,
      messageContent
    );
    try {
      const response = await this.doFetch(endpointUrl);
      if (response.status === 200) {
        // eslint-disable-next-line consistent-return
        return {
          success: true
        };
      }
      throw new Error(`Sveve returned status code: ${response.status}`);
    } catch (error) {
      console.error(`Sveve failed: ${recipientNumber}{${messageContent}}`);
      // eslint-disable-next-line consistent-return
      return {
        success: false,
        message: 'Something went wrong during Sveve'
      };
    }
  }

  async sendSmsWithPin(recipientNumber: string, pin: string) {
    const messageContent = `${pin}\nDin kode for å verifisere deg.\nDu kan også verifisere deg her: https://coronastatus.no/sms?nummer=${recipientNumber}`;
    return this.sendMessageToNumber(recipientNumber, messageContent);
  }

  // eslint-disable-next-line class-methods-use-this
  async doFetch(url: string) {
    return fetch(url);
  }
}
