import type { ValueOf } from 'type-fest'

export type ArkEnemyValueUnion = ValueOf<ArkEnemyCN.ArkEnemyCN> &
  ValueOf<ArkEnemyJP.ArkEnemyJP> &
  ValueOf<ArkEnemyKR.ArkEnemyKR> &
  ValueOf<ArkEnemyTW.ArkEnemyTW> &
  ValueOf<ArkEnemyUS.ArkEnemyUS>
