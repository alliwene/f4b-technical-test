import { BadRequest } from 'http-errors';
import { inject, injectable } from 'tsyringe';

import { IAccountRepository } from '../../../domain/repositories';

@injectable()
export class GetAccountsService {
  constructor(
    @inject('IAccountRepository') private accountRepository: IAccountRepository,
  ) {}

  async execute() {
    try {
      return await this.accountRepository.getAll();
    } catch (error) {
      throw new BadRequest(error);
    }
  }
}
