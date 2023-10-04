export enum ContentType {
  FormData = "multipart/form-data",
  Json = "application/json",
  Pdf = "application/pdf",
  Plain = "text/plain",
}

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  offline?: boolean;
  totalCount?: number;
  isDeleted?: boolean;

  constructor(response: ApiResponse<T>) {
    Object.assign(this, {
      ...response,
      success: !!response?.success,
      offline: !!response?.offline,
      isDeleted: !!response?.isDeleted,
    });
  }
}

export enum ApiMethod {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
  Put = "PUT",
}

export enum ApiRoute {
  Approve = "/approve",
  Publish = "/publish",
  Feedback = "/feedback",
  Job = "/job",
}

export enum ResponseMessage {
  Ok = "Ok",
  BadRequest = "Bad Request",
  Unauthorized = "Unauthorized",
  Forbidden = "Forbidden",
  NotFound = "Not Found",
  TooManyRequests = "Too Many Requests",
  InternalServerError = "Internal Server Error",
  GatewayTimeout = "Gateway Timeout",
}

export enum ResponseCode {
  Ok = 200,
  OkNoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
  GatewayTimeout = 504,
}

export const ResponseCodeKey: Record<number, ResponseMessage> = {
  200: ResponseMessage.Ok,
  400: ResponseMessage.BadRequest,
  401: ResponseMessage.Unauthorized,
  403: ResponseMessage.Forbidden,
  404: ResponseMessage.NotFound,
  429: ResponseMessage.TooManyRequests,
  500: ResponseMessage.InternalServerError,
  504: ResponseMessage.GatewayTimeout,
};
