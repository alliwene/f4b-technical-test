import { inject, singleton } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';

import { GetByAccountNumberService } from '../services';
import { GetByAccountNumberDto } from '../dtos';

@singleton()
export class GetByAccountNumberController {
  constructor(
    @inject('GetByAccountNumberService')
    private getByAccountNumberService: GetByAccountNumberService,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      //   const accountNumber = request.params.accountNumber;
      const { accountNumber } = plainToClass(GetByAccountNumberDto, {
        accountNumber: request.params.accountNumber,
      });

      const account = await this.getByAccountNumberService.execute(
        Number(accountNumber),
      );

      response.send(account);
    } catch (error) {
      next(error);
    }
  }
}
