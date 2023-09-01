import { IsNumberString, Length } from 'class-validator';

export class GetByAccountNumberDto {
  /**
   * Account number
   * @example 2664450323
   */
  @IsNumberString({}, { message: 'Account number must be digits' })
  @Length(10, 10, { message: 'Account number must be 10 digits' })
  accountNumber: string;
}
