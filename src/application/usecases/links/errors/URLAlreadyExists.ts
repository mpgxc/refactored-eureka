import { BaseError } from 'commons/BaseError';

class URLAlreadyExists extends BaseError {
  constructor(value: string) {
    super(`The URL "${value}" already registered!`, 'URLAlreadyExists');
  }
}

export { URLAlreadyExists };
