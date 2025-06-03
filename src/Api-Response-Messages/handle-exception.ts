import { HttpException, UnauthorizedException } from '@nestjs/common';
import { ApiResponse, internalServerError } from './Api-Responses';

export function handleException(
  action: string,
  error: unknown,
): ApiResponse<null> {
  if (error instanceof HttpException) {
    throw error;
  }
  if (error instanceof Error) {
    return internalServerError(`Failed to ${action}`, error.message);
  }
  return internalServerError(
    `Failed to ${action}`,
    'An unknown error occurred',
  );
}
export function handleTokenExpiryError(error: unknown): ApiResponse<null> {
  if (error instanceof Error && error.name === 'TokenExpiredError') {
    throw new UnauthorizedException('Token expired plz login again ');
  }
  throw new UnauthorizedException('invalid token, please login again');
}
