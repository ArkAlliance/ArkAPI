import { HideField, ObjectType } from '@nestjs/graphql'

import { Exclude } from 'class-transformer'

@ObjectType()
export class Character {
  @Exclude()
  @HideField()
  objectId: string

  /**
   * The ID of the character
   */
  id: string

  /**
   * The name of character
   */
  name: string

  /**
   * The description of character
   */
  description: string
}
