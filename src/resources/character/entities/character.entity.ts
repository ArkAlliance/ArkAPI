import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

export enum ArkCharacterProfession {
  PIONEER = 'PIONEER',
  SNIPER = 'SNIPER',
  CASTER = 'CASTER',
  MEDIC = 'MEDIC',
  WARRIOR = 'WARRIOR',
  TANK = 'TANK',
  SUPPORT = 'SUPPORT',
  SPECIAL = 'SPECIAL',
}

registerEnumType(ArkCharacterProfession, {
  name: 'ArkCharacterProfession',
})

export enum ArkCharacterPosition {
  /**
   * `MELEE`: 近战
   */
  MELEE = 'MELEE',

  /**
   * `RANGED`: 远程
   */
  RANGED = 'RANGED',
}

registerEnumType(ArkCharacterPosition, {
  name: 'ArkCharacterPosition',
})

@ObjectType()
export class Character {
  /** The ID of the character */
  id: string

  /** The name of the character */
  name: string

  /** The profession of character */
  profession: ArkCharacterProfession

  /** The position of character */
  position: ArkCharacterPosition

  /** The rarity of character */
  rarity: number

  /** The original data of character */
  @Field(() => GraphQLJSON)
  data: JSON
}
