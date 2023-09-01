/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    const errorMessages = err.flatMap((error: ValidationError) => {
      const constraints = Object.values(error.constraints || {});
      return constraints;
    });

    const formattedError = {
      path: req.path,
      method: req.method,
      message: errorMessages,
      error: 'Bad Request',
      statusCode: 400,
      timestamp: new Date().toISOString(),
    };

    console.error(formattedError);
    return res.status(400).json(formattedError);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  const formattedError = {
    path: req.path,
    method: req.method,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  console.error(formattedError);

  return res.status(statusCode).json(formattedError);
};
