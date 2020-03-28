export class NotEnoughReportsError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotEnoughReportsError.prototype);
    this.name = NotEnoughReportsError.name;
  }
}
