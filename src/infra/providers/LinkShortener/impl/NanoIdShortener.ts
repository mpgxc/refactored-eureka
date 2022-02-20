import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { ILinkShortener } from '../ILinkShortener';

@Injectable()
class NanoIdShortener implements ILinkShortener {
  build(): string {
    const size_token = 6;

    return nanoid(size_token);
  }
}

export { NanoIdShortener };
