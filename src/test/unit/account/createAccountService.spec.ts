import 'reflect-metadata';

import { CreateAccountService } from '../../../application/account/services';
import { IAccountRepository } from '../../../domain/repositories';
import { IAccount, AccountType } from '../../../domain/entitities/account';

describe('CreateAccountService', () => {
  let createAccountService: CreateAccountService;
  let accountRepository: IAccountRepository;

  beforeEach(() => {
    accountRepository = {
      create: jest.fn(),
    } as unknown as IAccountRepository;

    createAccountService = new CreateAccountService(accountRepository);
  });

  it('should create an account and return the account number', async () => {
    const account: IAccount = {
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date('1990-01-01'),
      accountType: AccountType.SAVINGS,
      initialBalance: 1000,
    } as IAccount;

    const accountNumber = 1234567890;

    jest
      .spyOn(accountRepository, 'create')
      .mockResolvedValueOnce(accountNumber);

    const result = await createAccountService.execute(account);

    expect(accountRepository.create).toHaveBeenCalledWith(account);
    expect(result).toEqual(accountNumber);
  });
});
