import { container } from 'tsyringe';

import { IAccountRepository } from '../../domain/repositories';
import { AccountRepository } from '../../infrastructure/persistence/repositories/accountRepository';
import {
  CreateAccountService,
  GetAccountsService,
  GetByAccountNumberService,
} from '../../application/account/services';

container.registerSingleton<IAccountRepository>(
  'IAccountRepository',
  AccountRepository,
);

container.register('CreateAccountService', {
  useClass: CreateAccountService,
});

container.register('GetAccountsService', {
  useClass: GetAccountsService,
});

container.register('GetByAccountNumberService', {
  useClass: GetByAccountNumberService,
});
