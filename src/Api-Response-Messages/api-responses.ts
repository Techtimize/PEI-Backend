import { PaginationInterface } from './interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
  pagination?: PaginationInterface;
}

export function successResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    statusCode: HttpStatus.OK,
    message,
    data,
  };
}

export function notFoundErrorResponse<T>(message: string): ApiResponse<T> {
  throw new HttpException(
    {
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error: 'Not Found',
    },
    HttpStatus.NOT_FOUND,
  );
}

export function internalServerError(message: string, error: string): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

export function badRequestError(message: string): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    },
    HttpStatus.BAD_REQUEST,
  );
}

export function unauthorizedError(message: string): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
    },
    HttpStatus.UNAUTHORIZED,
  );
}

export function userAlreadyExistError(message: string): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.CONFLICT,
      message,
    },
    HttpStatus.CONFLICT,
  );
}

export function userNotActive<T>(message: string, data: T): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
      data,
    },
    HttpStatus.UNAUTHORIZED,
  );
}

export function paginatedSuccessResponse<T>(
  message: string,
  data?: T,
  pagination?: PaginationInterface,
): ApiResponse<T> {
  return {
    statusCode: HttpStatus.OK,
    message,
    data,
    pagination,
  };
}
