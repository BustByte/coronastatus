/**
 * Represents a 6-digit login pin with expiration date.
 */
class LoginPin {
  constructor(pin, expires) {
    this.pin = pin;
    this.expires = expires;
  }
}

/**
 * Issues login pins to customers for logging in.
 */
class LoginPinIssuer {
  constructor() {
    this.attempts = {};
    this.issuedPins = {};
  }

  /**
   * - Generates and returns a pin that will be sent to the customer by e-mail.
   * It creates a new one if this is the first time the customer requests a pin.
   * It re-uses an old pin if the previous one has not yet expired (10 minutes).
   */
  issue(phoneNumber, now = new Date()) {
    if (this.alreadyHasUnexpiredPin(phoneNumber, now)) {
      console.info(`Issued unexpired pin to ${phoneNumber}.`);
    } else {
      console.info(`Issued fresh pin to ${phoneNumber}.`);
      this.issuedPins[phoneNumber] = LoginPinIssuer.generateNewPin(now);
    }
    return this.issuedPins[phoneNumber].pin;
  }

  /**
   * - Validates a pin to ensure customer owns e-mail address she provided.
   * Throttles by ip if someone is brute forcing emails or attempts.
   * Returns true if the pin is correct and conversely false if incorrect.
   */
  async validate(ip, phoneNumber, pinAttempt) {
    await this.waitProportionallyToRecentAttempts(ip);
    return (
      this.alreadyHasUnexpiredPin(phoneNumber) &&
      this.doesPinMatch(phoneNumber, pinAttempt)
    );
  }

  /**
   * - Waits for (number of validation attempts last 5 minutes) * 1 second.
   * Returns an asynchronous Promise to avoid locking up other resources.
   */
  async waitProportionallyToRecentAttempts(ip) {
    this.attempts[ip] = (this.attempts[ip] || []).concat(new Date());
    const secondsToWait = this.attempts[ip].reduce(
      (time, attempt) =>
        attempt > new Date(Date.now() - 1000 * 60 * 5) ? time + 1 : time,
      -1
    );
    return new Promise(resolve => setTimeout(resolve, secondsToWait * 1000));
  }

  doesPinMatch(phoneNumber, pinAttempt) {
    const doesPinMatch = this.issuedPins[phoneNumber].pin === pinAttempt.trim();
    console.info(`${phoneNumber} checked if pins matched (${doesPinMatch}).`);
    return doesPinMatch;
  }

  alreadyHasUnexpiredPin(phoneNumber, now = new Date()) {
    return (
      phoneNumber in this.issuedPins &&
      this.issuedPins[phoneNumber].expires > now
    );
  }

  /**
   * - Generates a new LoginPin (struct-like) with an expiration date 24 hours from now.
   */
  static generateNewPin(createdAt) {
    const randomSixDigitPin = Math.random()
      .toString()
      .substr(2, 6);
    const tenMinutesFromNow = new Date(
      createdAt.getTime() + 1000 * 60 * 60 * 24
    );
    return new LoginPin(randomSixDigitPin, tenMinutesFromNow);
  }
}

let instance = null;
const getInstance = () => {
  if (instance === null) {
    instance = new LoginPinIssuer();
  }
  return instance;
};

module.exports = { LoginPinIssuer, loginPinIssuer: getInstance() };
