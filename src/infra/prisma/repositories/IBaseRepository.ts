import { Entity } from 'commons/Entity';

interface IWriteRepository<E extends Entity> {
  delete(id: string): Promise<void>;
  update(item: E): Promise<void>;
  create(item: E): Promise<void>;
}

interface IReadRepository<E extends Entity, Response> {
  list(): Promise<Response[] | null>;
  findById(id: string): Promise<E | null>;
  findByIdRender(id: string): Promise<Response | null>;
}

export { IWriteRepository, IReadRepository };
