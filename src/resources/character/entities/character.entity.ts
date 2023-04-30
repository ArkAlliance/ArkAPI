import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

export enum ArkCharacterProfession {
  /** `PIONEER`: 先锋 */
  PIONEER = 'PIONEER',
  /** `SNIPER`: 狙击 */
  SNIPER = 'SNIPER',
  /** `CASTER`: 术师 */
  CASTER = 'CASTER',
  /** `MEDIC`: 医疗 */
  MEDIC = 'MEDIC',
  /** `WARRIOR`: 近卫 */
  WARRIOR = 'WARRIOR',
  /** `TANK`: 重装 */
  TANK = 'TANK',
  /** `SUPPORT`: 辅助 */
  SUPPORT = 'SUPPORT',
  /** `SPECIAL`: 特种 */
  SPECIAL = 'SPECIAL',
}

registerEnumType(ArkCharacterProfession, {
  name: 'ArkCharacterProfession',
  description: 'Character Profession 角色职业',
  valuesMap: {
    PIONEER: {
      description: 'Pioneer 先锋',
    },
    SNIPER: {
      description: 'Sniper 狙击',
    },
    CASTER: {
      description: 'Caster 术师',
    },
    MEDIC: {
      description: 'Medic 医疗',
    },
    WARRIOR: {
      description: 'Warrior 近卫',
    },
    TANK: {
      description: 'Tank 重装',
    },
    SUPPORT: {
      description: 'Support 辅助',
    },
    SPECIAL: {
      description: 'Special 特种',
    },
  },
})

export enum ArkCharacterPosition {
  /** `MELEE`: 近战 */
  MELEE = 'MELEE',

  /** `RANGED`: 远程 */
  RANGED = 'RANGED',
}

registerEnumType(ArkCharacterPosition, {
  name: 'ArkCharacterPosition',
  description: 'Character Deployment Position 角色可部署位',
  valuesMap: {
    MELEE: {
      description: 'Melee 近战位',
    },
    RANGED: {
      description: 'Ranged 远程位',
    },
  },
})

@ObjectType()
export class Character {
  /**
   * Character ID is an ArkAPI internal ID that is guaranteed to be unique and attached semantically to a specific `character` in the game.
   *
   * 一个保证唯一的 ArkAPI 内部 ID。此 ID 在语义上保证与游戏中的一个特定「干员」相对应
   */
  id: string

  /**
   * Character Name is the name of the character in the game. The name localization is based on the server queried. ArkAPI will not translate and will instead just provide the name as-is.
   *
   * 游戏中的干员名称。名称本地化基于查询的服务器。ArkAPI 不会对干员名称自行翻译，而是直接提供原始名称
   */
  name: string

  /**
   * Character Profession is the professions that a character can be categorized into.
   *
   * 干员职业
   */
  profession: ArkCharacterProfession

  /**
   * Character Position is the position category that a character can be deployed to.
   *
   * 干员可部署位
   */
  position: ArkCharacterPosition

  /**
   * Character Rarity is the rarity of a character. The rarity is a number in range [0, 5] where a rarity of `0` corresponds to a 1-star character and a rarity of `5` corresponds to a 6-star character.
   *
   * 干员稀有度。稀有度是一个范围在 [0, 5] 的数字，其中稀有度为 `0` 对应 1 星干员、为 `5` 对应 6 星干员
   */
  rarity: number

  /**
   * Character Data is the original JSON data of the character.
   *
   * 干员原始数据
   */
  @Field(() => GraphQLJSON)
  data: JSON
}
