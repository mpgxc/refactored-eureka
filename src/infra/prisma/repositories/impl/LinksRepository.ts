import { Injectable } from '@nestjs/common';
import { Links as LinksResponseRender } from '@prisma/client';

import { Links } from 'domain/links/Links';

import { LinksMapper } from '../../mappers';
import { PrismaService } from '../../prisma.service';
import { BaseRepository } from '../BaseRepository';

@Injectable()
class LinksRepository extends BaseRepository<Links, LinksResponseRender> {
  constructor(prisma: PrismaService, mapper: LinksMapper) {
    super(prisma.links, mapper);
  }

  async findByURL(url: string): Promise<Links | null> {
    const data = await this.repository.findUnique({
      where: { url },
    });

    return data ? this.mapper.toDomain(data) : null;
  }
}

export { LinksRepository };
