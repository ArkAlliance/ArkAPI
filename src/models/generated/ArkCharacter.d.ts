import type { ValueOf } from 'type-fest'

export type ArkCharacterValueUnion = ValueOf<ArkCharacterCN.ArkCharacterCN> &
  ValueOf<ArkCharacterJP.ArkCharacterJP> &
  ValueOf<ArkCharacterKR.ArkCharacterKR> &
  ValueOf<ArkCharacterTW.ArkCharacterTW> &
  ValueOf<ArkCharacterUS.ArkCharacterUS>
