import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsDate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { AccountType } from '../../../domain/entitities/account';
import { IsBeforeCurrentDate } from '../decorators/beforeCurrentDayDecorator';

export class CreateAccountDto {
  /**
   * User first name
   * @example Jane
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * User last name
   * @example Doe
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * User DOB
   * @example 2021-01-01
   */
  @IsDate()
  @IsBeforeCurrentDate({ message: 'DOB has to be before current date' })
  @Type(() => Date)
  dob: Date;

  /**
   * Account type
   * @example 'Savings'
   */
  @IsEnum(AccountType, {
    message: `Account type must be one of the following values: ${Object.values(
      AccountType,
    )}`,
  })
  accountType: AccountType;

  /**
   * Initial account balance
   * @example 1000
   */
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Initial Balance must be a number' },
  )
  @IsNotEmpty()
  @Min(0, { message: 'Initial Balance must be a non-negative number' })
  @Transform(({ value }) => parseFloat(value))
  @Type(() => Number)
  initialBalance: number;
}
