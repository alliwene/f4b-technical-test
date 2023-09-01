import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBeforeCurrentDate', async: false })
export class IsBeforeCurrentDateConstraint
  implements ValidatorConstraintInterface
{
  validate(date: Date) {
    return date < new Date();
  }
}

export function IsBeforeCurrentDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBeforeCurrentDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBeforeCurrentDateConstraint,
    });
  };
}
