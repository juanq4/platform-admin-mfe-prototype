import type { APIGatewayProxyResult } from "aws-lambda";
import { ValidationError } from "../definitions";

export function generateSuccessResponse(statusCode: number, payload: object): APIGatewayProxyResult {
  return {
    statusCode,
    body: JSON.stringify({ success: true, data: payload }),
  };
}

export function generateErrorResponse(error: unknown): APIGatewayProxyResult {
  console.error(error);

  // A custom Error is thrown
  if (error instanceof ValidationError) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }

  // An Error is thrown
  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }

  // A string is thrown
  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: error,
    }),
  };
}
