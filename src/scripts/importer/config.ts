import { ArkServer } from '@prisma/client'
import { CharacterResourceImporter } from 'scripts/importer/entities/character'
import { EnemyResourceImporter } from 'scripts/importer/entities/enemy'
import { ResourceImporterBase } from 'scripts/importer/importer'

export const imports: {
  cls: typeof ResourceImporterBase
  servers: ArkServer[]
}[] = [
  {
    cls: CharacterResourceImporter,
    servers: ['CN', 'US', 'JP', 'KR', 'TW'],
  },
  {
    cls: EnemyResourceImporter,
    servers: ['CN', 'US', 'JP', 'KR', 'TW'],
  },
]
