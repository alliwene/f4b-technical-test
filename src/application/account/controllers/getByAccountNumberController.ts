import { inject, singleton } from 'tsyringe';
import { Get, Path, Response, Route } from 'tsoa';

import { GetByAccountNumberService } from '../services';

@Route('account')
@singleton()
export class GetByAccountNumberController {
  constructor(
    @inject('GetByAccountNumberService')
    private getByAccountNumberService: GetByAccountNumberService,
  ) {}

  @Response(400, 'Account number must be 10 digits')
  @Response(404, 'Account not found')
  @Get('/:accountNumber')
  async handle(@Path('accountNumber') accountNumber: string) {
    const account = await this.getByAccountNumberService.execute(
      Number(accountNumber),
    );

    return account;
  }
}
