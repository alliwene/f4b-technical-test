import { injectable } from 'tsyringe';
import { NotFound } from 'http-errors';

import { IAccountRepository } from '../../../domain/repositories';
import { Account } from '../entitites/account';

@injectable()
export class AccountRepository implements IAccountRepository {
  private accounts: Account[] = [];

  async create({
    firstName,
    lastName,
    dob,
    accountType,
    initialBalance,
  }: Account): Promise<number> {
    let accountNumber: number;
    do {
      accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    } while (
      this.accounts.some((account) => account.accountNumber === accountNumber)
    );

    const account = {
      accountNumber,
      firstName,
      lastName,
      dob,
      accountType,
      initialBalance,
    };

    this.accounts.push(account);

    return accountNumber;
  }

  async getByAccountNumber(accountNumber: number): Promise<Account> {
    const account = this.accounts.find(
      (account) => account.accountNumber === accountNumber,
    );
    if (!account) {
      throw new NotFound(`Account with number ${accountNumber} not found`);
    }

    return account;
  }

  async getAll(): Promise<Account[]> {
    return this.accounts;
  }
}
