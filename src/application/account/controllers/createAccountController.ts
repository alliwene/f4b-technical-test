import { inject, singleton } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import { CreateAccountService } from '../services';
import { CreateAccountDto } from '../dtos';
import { IAccount } from '../../../domain/entitities/account';

@singleton()
export class CreateAccountController {
  constructor(
    @inject('CreateAccountService')
    private createAccountService: CreateAccountService,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { firstName, lastName, dob, accountType, initialBalance } =
        request.body as CreateAccountDto;

      const accountNumber = await this.createAccountService.execute({
        firstName,
        lastName,
        dob,
        accountType,
        initialBalance,
      } as IAccount);

      response.status(201).send({
        accountNumber,
        name: `${firstName} ${lastName}`,
        accountType,
        balance: Number(initialBalance),
      });
    } catch (error) {
      next(error);
    }
  }
}
