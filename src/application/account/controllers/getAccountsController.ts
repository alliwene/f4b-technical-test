import { inject, singleton } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import { GetAccountsService } from '../services';

@singleton()
export class GetAccountsController {
  constructor(
    @inject('GetAccountsService')
    private getAccountsService: GetAccountsService,
  ) {}

  async handle(_request: Request, response: Response, next: NextFunction) {
    try {
      const accounts = await this.getAccountsService.execute();
      response.json(accounts);
    } catch (error) {
      next(error);
    }
  }
}
