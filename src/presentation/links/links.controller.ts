import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  RegisterShortenedLink,
  RegisterShortenedLinkRequest,
} from 'application/usecases/links/RegisterShortenedLink';

@Controller('links')
export class LinksController {
  constructor(private readonly registerShortenedLink: RegisterShortenedLink) {}

  @Post()
  async create(@Body() request: RegisterShortenedLinkRequest): Promise<void> {
    const result = await this.registerShortenedLink.execute(request);

    if (result.isError) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: Object.fromEntries(
            result.value.map(({ value }) => [value.name, value.message]),
          ),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
