abstract class BaseError extends Error {
  constructor(public message: string, public name: string) {
    super(message);
  }
}

export { BaseError };
