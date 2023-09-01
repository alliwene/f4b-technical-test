import { inject, singleton } from 'tsyringe';
import { Body, Post, Route, SuccessResponse, Response } from 'tsoa';

import { CreateAccountService } from '../services';
import { CreateAccountDto } from '../dtos';
import { IAccount } from '../../../domain/entitities/account';

@Route('account')
@singleton()
export class CreateAccountController {
  constructor(
    @inject('CreateAccountService')
    private createAccountService: CreateAccountService,
  ) {}

  @Response(401)
  @SuccessResponse(201)
  @Post('/')
  async handle(
    @Body()
    { firstName, lastName, dob, accountType, initialBalance }: CreateAccountDto,
  ) {
    const accountNumber = await this.createAccountService.execute({
      firstName,
      lastName,
      dob,
      accountType,
      initialBalance,
    } as IAccount);

    return {
      accountNumber,
      name: `${firstName} ${lastName}`,
      accountType,
      balance: Number(initialBalance),
    };
  }
}
