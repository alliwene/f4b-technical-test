import { inject, singleton } from 'tsyringe';
import { Get, Route } from 'tsoa';

import { GetAccountsService } from '../services';

@Route('account')
@singleton()
export class GetAccountsController {
  constructor(
    @inject('GetAccountsService')
    private getAccountsService: GetAccountsService,
  ) {}

  @Get('/')
  async handle() {
    const accounts = await this.getAccountsService.execute();
    return accounts;
  }
}
