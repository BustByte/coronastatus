/**
 * Represents a 6-digit login pin with expiration date.
 */
export class LoginPin {
  pin: string;
  expires: Date;
  constructor(pin: string, expires: Date) {
    this.pin = pin;
    this.expires = expires;
  }
}
