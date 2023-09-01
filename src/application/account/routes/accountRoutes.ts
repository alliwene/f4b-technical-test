import { container } from 'tsyringe';
import { Router, Request, Response, NextFunction } from 'express';

import {
  CreateAccountController,
  GetAccountsController,
  GetByAccountNumberController,
} from '../controllers';
import { CreateAccountDto, GetByAccountNumberDto } from '../dtos';
import { validationMiddleware } from '../../../infrastructure/common/middleware';
import '../depency-injection/accountContainer';

export const accountRouter = Router();

const createAccountController = container.resolve(CreateAccountController);
const getAccountsController = container.resolve(GetAccountsController);
const getByAccountNumberController = container.resolve(
  GetByAccountNumberController,
);

accountRouter.post(
  '/',
  validationMiddleware(CreateAccountDto, 'body'),
  (request: Request, response: Response, next: NextFunction) => {
    createAccountController.handle(request, response, next);
  },
);

accountRouter.get(
  '/',
  (request: Request, response: Response, next: NextFunction) => {
    getAccountsController.handle(request, response, next);
  },
);

accountRouter.get(
  '/:accountNumber',
  validationMiddleware(GetByAccountNumberDto, 'params'),
  (request: Request, response: Response, next: NextFunction) => {
    getByAccountNumberController.handle(request, response, next);
  },
);
