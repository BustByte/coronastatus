const fetch = require("node-fetch");

class SmsGatewayService {
  constructor(username, password, shouldSendSms) {
    this.username = username;
    this.password = password;
    this.shouldSendSms = shouldSendSms;
  }

  createEndpointString(recipientNumber, messageContent) {
    return `https://sveve.no/SMS/SendMessage?user=${this.username}&passwd=${
      this.password
    }&to=${recipientNumber}&msg=${encodeURIComponent(
      messageContent
    )}&from=Batvett`;
  }

  async sendMessageToNumber(recipientNumber, messageContent) {
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
        message: "Something went wrong during Sveve"
      };
    }
  }

  async sendSmsWithPin(recipientNumber, pin) {
    const messageContent = `${pin}\nDin engangskode for innlogging til [redact].`;
    return this.sendMessageToNumber(recipientNumber, messageContent);
  }

  async sendInviteLink(invitedByUser, discountAmount, recipientNumber, link) {
    const messageContent = `Gratulerer! Din venn ${
      invitedByUser.fullName
    } har gitt deg ${discountAmount},- rabatt hos [redacted]! Velkommen! ${link}`;
    return this.sendMessageToNumber(recipientNumber, messageContent);
  }

  // eslint-disable-next-line class-methods-use-this
  async doFetch(url) {
    return fetch(url);
  }
}

module.exports = {
  SmsGatewayService
};
