import { AccountType } from '../../../domain/entitities/account';

export class Account {
  accountNumber: number;
  firstName: string;
  lastName: string;
  dob: Date;
  accountType: AccountType;
  initialBalance: number;
}
