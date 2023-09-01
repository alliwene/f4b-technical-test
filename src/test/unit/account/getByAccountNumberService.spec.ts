import 'reflect-metadata';
import { NotFound } from 'http-errors';

import { GetByAccountNumberService } from '../../../application/account/services';
import { IAccountRepository } from '../../../domain/repositories';
import { IAccount, AccountType } from '../../../domain/entitities/account';

describe('GetByAccountNumberService', () => {
  let getByAccountNumberService: GetByAccountNumberService;
  let accountRepository: IAccountRepository;

  beforeEach(() => {
    accountRepository = {
      getByAccountNumber: jest.fn(),
    } as unknown as IAccountRepository;

    getByAccountNumberService = new GetByAccountNumberService(
      accountRepository,
    );
  });

  it('should return an account', async () => {
    const account: IAccount = {
      accountNumber: 1234567890,
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date('1990-01-01'),
      accountType: AccountType.CHECKING,
      initialBalance: 1000,
    };

    jest
      .spyOn(accountRepository, 'getByAccountNumber')
      .mockResolvedValueOnce(account);

    const result = await getByAccountNumberService.execute(1234567890);

    expect(accountRepository.getByAccountNumber).toHaveBeenCalledWith(
      1234567890,
    );
    expect(result).toEqual(account);
  });

  it('should throw a NotFound error if the account is not found', async () => {
    const error = new NotFound('Account not found');

    jest
      .spyOn(accountRepository, 'getByAccountNumber')
      .mockRejectedValueOnce(error);

    await expect(
      getByAccountNumberService.execute(1234567891),
    ).rejects.toThrowError(NotFound);
  });
});
