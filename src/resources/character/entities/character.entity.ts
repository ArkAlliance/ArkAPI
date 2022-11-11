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
  canUseGeneralPotentialItem: boolean
  canUseActivityPotentialItem: boolean
  potentialItemId: string | null
  activityPotentialItemId: string | null
  nationId: string | null
  groupId: string | null
  teamId: string | null
  displayNumber: string | null
  tokenKey: string | null
  appellation: string
  position: string
  tagList: string[]
  itemUsage: string | null
  itemDesc: string | null
  itemObtainApproach: string | null
  isNotObtainable: boolean
  isSpChar: boolean
  maxPotentialLevel: number
  rarity: number
  profession: string
  subProfessionId: string
  trait: Trait | null
  phases: Phase[]
  skills: Skill[]
  talents: Talent[] | null
  potentialRanks: PotentialRank[]
  favorKeyFrames: KeyFrame[] | null
  allSkillLvlup: AllSkillLvlup[]
}

@ObjectType()
class AllSkillLvlup {
  unlockCond: UnlockCond
  lvlUpCost: Cost[] | null
}

@ObjectType()
class Cost {
  id: string
  count: number
  type: string
}

@ObjectType()
class UnlockCond {
  phase: number
  level: number
}

@ObjectType()
class KeyFrame {
  level: number
  data: Data
}

@ObjectType()
class Data {
  maxHp: number
  atk: number
  def: number
  magicResistance: number
  cost: number
  blockCnt: number
  moveSpeed: number
  attackSpeed: number
  baseAttackTime: number
  respawnTime: number
  hpRecoveryPerSec: number
  spRecoveryPerSec: number
  maxDeployCount: number
  maxDeckStackCnt: number
  tauntLevel: number
  massLevel: number
  baseForceLevel: number
  stunImmune: boolean
  silenceImmune: boolean
  sleepImmune: boolean
  frozenImmune: boolean
  levitateImmune: boolean
}

@ObjectType()
class Phase {
  characterPrefabKey: string
  rangeId: null | string
  maxLevel: number
  attributesKeyFrames: KeyFrame[]
  evolveCost: Cost[] | null
}

@ObjectType()
class PotentialRank {
  type: number
  description: string
  buff: Buff | null
  equivalentCost: string | null
}

@ObjectType()
class Buff {
  attributes: Attributes
}

@ObjectType()
class Attributes {
  abnormalFlags: string | null
  abnormalImmunes: string | null
  abnormalAntis: string | null
  abnormalCombos: string | null
  abnormalComboImmunes: string | null
  attributeModifiers: AttributeModifier[]
}

@ObjectType()
class AttributeModifier {
  attributeType: number
  formulaItem: number
  value: number
  loadFromBlackboard: boolean
  fetchBaseValueFromSourceEntity: boolean
}

@ObjectType()
class Skill {
  skillId: null | string
  overridePrefabKey: null | string
  overrideTokenKey: null | string
  levelUpCostCond: LevelUpCostCond[]
  unlockCond: UnlockCond
}

@ObjectType()
class LevelUpCostCond {
  unlockCond: UnlockCond
  lvlUpTime: number
  levelUpCost: Cost[] | null
}

@ObjectType()
class Talent {
  candidates: TalentCandidate[] | null
}

@ObjectType()
class TalentCandidate {
  unlockCondition: UnlockCond
  requiredPotentialRank: number
  prefabKey: string
  name: null | string
  description: null | string
  rangeId: string | null
  blackboard: Blackboard[]
}

@ObjectType()
class Blackboard {
  key: string
  value: number
}

@ObjectType()
class Trait {
  candidates: TraitCandidate[]
}

@ObjectType()
class TraitCandidate {
  unlockCondition: UnlockCond
  requiredPotentialRank: number
  blackboard: Blackboard[]
  overrideDescripton: null | string
  prefabKey: null | string
  rangeId: null | string
}
