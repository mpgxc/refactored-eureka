import { BaseError } from 'commons/BaseError';

class InvalidURLError extends BaseError {
  constructor(value: string) {
    super(`The URL "${value}" is invalid!`, 'InvalidURLError');
  }
}

export { InvalidURLError };
