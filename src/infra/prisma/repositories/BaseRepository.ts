import { Entity } from 'commons/Entity';
import {
  IReadRepository,
  IWriteRepository,
} from 'infra/prisma/repositories/IBaseRepository';

import { IMapper } from '../mappers/IMapper';
import { IPrisma } from './types/IPrisma';

abstract class BaseRepository<E extends Entity, Response>
  implements IWriteRepository<E>, IReadRepository<E, Response>
{
  constructor(
    protected readonly repository: IPrisma,
    protected readonly mapper: IMapper,
  ) {}

  async list(): Promise<Response[] | null> {
    const data = this.repository.findMany({}) as E[];

    return data.length ? (data.map(this.mapper.toRender) as Response[]) : null;
  }

  async findById(id: string): Promise<E | null> {
    const data = this.repository.findUnique({
      where: { id },
    });

    return data ? this.mapper.toDomain(data) : null;
  }

  async findByIdRender(id: string): Promise<Response | null> {
    const data = this.repository.findUnique({
      where: { id },
    }) as E;

    return data ? (this.mapper.toRender(data) as Response) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: { id },
    });
  }

  async update(item: E): Promise<void> {
    await this.repository.update({
      where: { id: item.id },
      data: item,
    });
  }

  async create(item: E): Promise<void> {
    const data = this.mapper.toPersistence(item);

    await this.repository.create({
      data,
    });
  }
}

export { BaseRepository };
