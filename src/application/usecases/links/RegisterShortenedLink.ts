import { Injectable } from '@nestjs/common';

import { Either, IResultFailure, Result } from 'commons/Either';
import { UseCase } from 'commons/UseCase';
import { InvalidURLError } from 'domain/links/errors/InvalidURLError';
import { Links } from 'domain/links/Links';
import { URL } from 'domain/links/URL';
import { LinksRepository } from 'infra/prisma/repositories';
import { LinkShortenerProvider } from 'infra/providers/LinkShortener';

import { URLAlreadyExists } from './errors/URLAlreadyExists';

type RegisterShortenedLinkRequest = {
  url: string;
};

type RegisterShortenedLinkErrors = IResultFailure<
  unknown,
  InvalidURLError | URLAlreadyExists
>;

type RegisterShortenedLinkResponse = Either<
  Links,
  Array<RegisterShortenedLinkErrors>
>;

@Injectable()
class RegisterShortenedLink extends UseCase<
  RegisterShortenedLinkErrors,
  RegisterShortenedLinkRequest,
  RegisterShortenedLinkResponse
> {
  constructor(
    private readonly linksRepository: LinksRepository,
    private readonly linkShortenerProvider: LinkShortenerProvider,
  ) {
    super();
  }

  async execute({
    url,
  }: RegisterShortenedLinkRequest): Promise<RegisterShortenedLinkResponse> {
    this.errors = [];

    const urlOrError = URL.build(url);

    if (urlOrError.isError) {
      this.errors.push(Result.Failure(urlOrError.value));
    }

    if (this.errors.length) {
      return Result.Failure(this.errors);
    }

    const urlValue = urlOrError.value as URL;

    const urlAlreadyExists = await this.linksRepository.findByURL(
      urlValue.value,
    );

    if (urlAlreadyExists) {
      this.errors.push(Result.Failure(new URLAlreadyExists(url)));
    }

    if (this.errors.length) {
      return Result.Failure(this.errors);
    }

    const token = this.linkShortenerProvider.build();

    const data = Links.build({
      url: urlValue,
      token,
    });

    await this.linksRepository.create(data);

    return Result.Success(data);
  }
}

export { RegisterShortenedLink, RegisterShortenedLinkRequest };
