import { Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

export function FieldDescription(value: string): PropertyDecorator {
  const description = value
    .trimStart()
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
  return function (target: object, propertyKey: string) {
    // Apply both Foo and Bar decorators with the given value.
    ApiProperty({ description })(target, propertyKey)
    Field({ description })(target, propertyKey)
  }
}
