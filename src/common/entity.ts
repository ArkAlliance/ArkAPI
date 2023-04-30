import {
  Field,
  FieldOptions,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from '@nestjs/graphql'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export function SimpleField(
  value: string,
  {
    graphql,
    graphqlType,
    swagger,
  }: {
    graphql?: FieldOptions<unknown>
    graphqlType?: ReturnTypeFunc<ReturnTypeFuncValue>
    swagger?: ApiPropertyOptions
  } = {},
): PropertyDecorator {
  const description = value
    .trimStart()
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
  return function (target: object, propertyKey: string) {
    // Apply both Foo and Bar decorators with the given value.
    ApiProperty({ description, ...swagger })(target, propertyKey)
    if (graphqlType === undefined) {
      Field({ description, ...graphql })(target, propertyKey)
    } else {
      Field(graphqlType, { description, ...graphql })(target, propertyKey)
    }
  }
}
