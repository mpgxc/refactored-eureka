abstract class UseCase<Errors = unknown, Request = unknown, Response = void> {
  protected errors?: Array<Errors>;

  abstract execute(request: Request): Promise<Response>;
}

export { UseCase };
