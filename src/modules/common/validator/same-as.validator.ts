import { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export const SameAs = (property: string, validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'sameAs',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate: (value: any, args: any) => {
          const [relatedPropertyName] = args.constraints;
          return args.object[relatedPropertyName] === value;
        },
        defaultMessage: () => {
          return '$property must match $constraint1';
        },
      },
    });
  };
};
