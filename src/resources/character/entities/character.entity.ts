import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Character {
  @Field({ description: 'name of character' })
  name: string

  @Field({ description: 'description of character' })
  description: string
}
