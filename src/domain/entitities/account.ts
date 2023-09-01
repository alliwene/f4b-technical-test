export enum AccountType {
  SAVINGS = 'savings',
  CURRENT = 'current',
  CHECKING = 'checking',
}

export interface IAccount {
  accountNumber: number;
  firstName: string;
  lastName: string;
  dob: Date;
  accountType: AccountType;
  initialBalance: number;
}
