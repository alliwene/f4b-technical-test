import { IAccount } from '../entitities/account';

export interface IAccountRepository {
  create: ({
    firstName,
    lastName,
    dob,
    accountType,
    initialBalance,
  }: IAccount) => Promise<number>;
  getByAccountNumber: (accountNumber: number) => Promise<IAccount>;
  getAll: () => Promise<IAccount[]>;
}
