import 'reflect-metadata';

import { GetAccountsService } from '../../../application/account/services';
import { IAccountRepository } from '../../../domain/repositories';
import { IAccount, AccountType } from '../../../domain/entitities/account';

describe('GetAccountsService', () => {
  let getAccountsService: GetAccountsService;
  let accountRepository: IAccountRepository;

  beforeEach(() => {
    accountRepository = {
      getAll: jest.fn(),
    } as unknown as IAccountRepository;

    getAccountsService = new GetAccountsService(accountRepository);
  });

  it('should return a list of accounts', async () => {
    const accounts: IAccount[] = [
      {
        accountNumber: 1234567890,
        firstName: 'John',
        lastName: 'Doe',
        dob: new Date('1990-01-01'),
        accountType: AccountType.SAVINGS,
        initialBalance: 1000,
      },
      {
        accountNumber: 987654321,
        firstName: 'Jane',
        lastName: 'Doe',
        dob: new Date('1995-01-01'),
        accountType: AccountType.CHECKING,
        initialBalance: 500,
      },
    ];

    jest.spyOn(accountRepository, 'getAll').mockResolvedValueOnce(accounts);

    const result = await getAccountsService.execute();

    expect(accountRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(accounts);
  });
});
