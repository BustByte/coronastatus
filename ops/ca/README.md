## Deployment

### Ubuntu 18.04

Follow the steps below to deploy a production-ready NodeJS application on an Ubuntu 18.04 server. The application will be managed by PM2, which provides users with secure access to the application through an Nginx reverse proxy. Certbot will enable HTTPS for Nginx using a free certificate provided by Let’s Encrypt.

#### Prerequisities

- [NodeJS](https://nodejs.org/)

  `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

  `sudo apt-get install -y nodejs`

- [Yarn](https://yarnpkg.com/)

  `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`

  `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

  `sudo apt update && sudo apt install yarn`

- [PM2](https://pm2.keymetrics.io/) with TypeScript support

  `sudo npm install pm2@latest -g`
  `sudo pm2 install typescript`

- [Nginx](https://www.nginx.com/)

  `sudo apt install nginx`

- [Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)

  `sudo apt-get install software-properties-common`

  `sudo add-apt-repository universe`

  `sudo add-apt-repository ppa:certbot/certbot`

  `sudo apt-get update`

  `sudo apt-get install certbot python-certbot-nginx`

#### Steps

1. Clone the repository

`git clone https://github.com/BustByte/coronastatus`

2. Move into the newly cloned directory

`cd coronastatus`

3. Install dependencies

`yarn`

4. Create a configuration file from the example provided in this repo and make changes if necessary

`cp config.example.json config.json`

5. Create a PM2 configuration file from the example provided in this repo

`cp pm2.example.json pm2.json`

6. Start the application

`pm2 start pm2.json`

7. Configre DNS for your domain. You can create a "A" record set and map your instance's IP to your domain.

8. Create a Nginx configuration file from the example provided in this repo. Replace `YOUR_DOMAIN` with your domain name (e.g., coronastatus.ca) first.

`sudo cp nginx-site-default.example /etc/nginx/site-available/default`

`sudo service nginx restart`

9. Enable HTTPS

`sudo certbot --nginx`