interface IPrisma {
  create(data: unknown): unknown;
  delete(data: unknown): unknown;
  findFirst(data: unknown): unknown;
  findMany(data: unknown): unknown;
  findUnique(data: unknown): unknown;
  update(data: unknown): unknown;
}

export { IPrisma };
