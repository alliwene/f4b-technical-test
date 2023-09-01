import { injectable, inject } from 'tsyringe';
import { NotFound, BadRequest } from 'http-errors';

import { IAccountRepository } from '../../../domain/repositories';

@injectable()
export class GetByAccountNumberService {
  constructor(
    @inject('IAccountRepository') private accountRepository: IAccountRepository,
  ) {}

  async execute(accountNumber: number) {
    try {
      const account =
        await this.accountRepository.getByAccountNumber(accountNumber);

      return account;
    } catch (error) {
      if (error instanceof NotFound) {
        throw new NotFound(error.message);
      }
      throw new BadRequest(error);
    }
  }
}
