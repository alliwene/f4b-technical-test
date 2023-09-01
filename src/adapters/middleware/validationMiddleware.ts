import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

export const validationMiddleware = (
  validatorClass: any,
  source: 'body' | 'params',
) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const data = source === 'body' ? request.body : request.params;
    const validatorObject = plainToInstance(validatorClass, data);

    const errors = await validate(validatorObject);

    if (errors.length > 0) {
      next(errors);
    } else {
      next();
    }
  };
};
