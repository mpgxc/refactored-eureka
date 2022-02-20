/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { Links as LinksResponse } from '@prisma/client';

import { Links } from 'domain/links/Links';
import { URL } from 'domain/links/URL';

import { IMapper } from '../IMapper';

type LinksResponseRender = LinksResponse & {};

@Injectable()
class LinksMapper
  implements IMapper<Links, LinksResponse, LinksResponseRender>
{
  toPersistence(data: Links): Partial<LinksResponse> {
    const { id, token, url } = data;

    return {
      id,
      url,
      token,
    };
  }

  toDomain(data: LinksResponse): Links {
    const { token, url } = data;

    return Links.build(
      {
        token,
        url: URL.build(url).value as URL,
      },
      data.id,
    );
  }

  toRender(data: LinksResponse): LinksResponseRender {
    return {
      ...data,
    };
  }
}

export { LinksMapper };
