import { Entity } from 'commons/Entity';

interface IMapper<
  E extends Entity = any,
  Persistence = unknown,
  Response = unknown,
> {
  toPersistence(data: E): Partial<Persistence>;
  toDomain(data: Persistence): E;
  toRender(data: Persistence): Response;
}

export { IMapper };
