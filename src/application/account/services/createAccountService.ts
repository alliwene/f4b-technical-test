import { injectable, inject } from 'tsyringe';
import { BadRequest } from 'http-errors';

import { IAccountRepository } from '../../../domain/repositories';
import { IAccount } from '../../../domain/entitities/account';

@injectable()
export class CreateAccountService {
  constructor(
    @inject('IAccountRepository') private accountRepository: IAccountRepository,
  ) {}

  async execute({
    firstName,
    lastName,
    dob,
    accountType,
    initialBalance,
  }: IAccount) {
    try {
      const accountNumber = await this.accountRepository.create({
        firstName,
        lastName,
        dob,
        accountType,
        initialBalance,
      } as IAccount);

      return accountNumber;
    } catch (error) {
      throw new BadRequest(error);
    }
  }
}
