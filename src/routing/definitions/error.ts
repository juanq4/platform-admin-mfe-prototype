export enum ErrorMessage {
  BadRequest = "Bad request",
  MissingBody = "Missing body",
  MissingRequiredParams = "Missing required parameters",
  MissingVersionHeader = "Missing version header",
  MissingS3Bucket = "Missing S3 bucket",
  MissingS3BucketContent = "Missing S3 bucket content",
  ResourceNotFound = "Resource not found",
  ServerError = "Internal server error",
  InvalidJsonBody = "Invalid JSON body",
  VersionNotFound = "Version is not in S3 bucket",
}

export class ClientError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ClientError";
    this.statusCode = 400;
  }
}

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
  }
}

export class ValidationError extends ClientError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
