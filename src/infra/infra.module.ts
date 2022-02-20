import { Global, Module } from '@nestjs/common';

import { LinksMapper } from './prisma/mappers';
import { PrismaService } from './prisma/prisma.service';
import { LinksRepository } from './prisma/repositories';
import { LinkShortenerProvider } from './providers/LinkShortener';

@Global()
@Module({
  providers: [
    PrismaService,
    LinkShortenerProvider,
    LinksRepository,
    LinksMapper,
  ],
  exports: [PrismaService, LinkShortenerProvider, LinksRepository],
})
export class InfraModule {}
