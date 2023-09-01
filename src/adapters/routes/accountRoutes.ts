import { container } from 'tsyringe';
import { Router, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';

import {
  CreateAccountController,
  GetAccountsController,
  GetByAccountNumberController,
} from '../../application/account/controllers';
import {
  CreateAccountDto,
  GetByAccountNumberDto,
} from '../../application/account/dtos';
import { validationMiddleware } from '../middleware';
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
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, dob, accountType, initialBalance } =
        request.body as CreateAccountDto;
      const account = await createAccountController.handle({
        firstName,
        lastName,
        dob,
        accountType,
        initialBalance,
      });

      response.status(201).send(account);
    } catch (error) {
      next(error);
    }
  },
);

accountRouter.get(
  '/',
  async (_request: Request, response: Response, next: NextFunction) => {
    getAccountsController.handle();
    try {
      const accounts = await getAccountsController.handle();
      response.send(accounts);
    } catch (error) {
      next(error);
    }
  },
);

accountRouter.get(
  '/:accountNumber',
  validationMiddleware(GetByAccountNumberDto, 'params'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { accountNumber } = plainToClass(GetByAccountNumberDto, {
        accountNumber: request.params.accountNumber,
      });

      const account = await getByAccountNumberController.handle(accountNumber);

      response.send(account);
    } catch (error) {
      next(error);
    }
  },
);
