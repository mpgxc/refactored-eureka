import { Either, Result } from 'commons/Either';

import { InvalidURLError } from './errors/InvalidURLError';

class URL {
  private constructor(private readonly _value: string) {}

  private static format(value: string): string {
    return value.replace(/\s/g, '').toLowerCase();
  }

  private static validate(value: string): boolean {
    const pattern =
      /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/;

    if (!pattern.test(value)) {
      return false;
    }

    return true;
  }

  get value(): string {
    return this._value;
  }

  public static build(value: string): Either<URL, InvalidURLError> {
    const formatedValue = this.format(value);

    if (!this.validate(formatedValue)) {
      return Result.Failure(new InvalidURLError(value));
    }

    return Result.Success(new URL(formatedValue));
  }
}

export { URL };
