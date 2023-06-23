export class ResponseError extends Error {
  public readonly status: number = 500
}

export class BadRequest extends ResponseError {
  public readonly status = 400
}

export class NotFound extends ResponseError {
  public readonly status = 404
}
