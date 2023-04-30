import { quicktypeToTypeScript } from 'scripts/importer/quicktype'
import { ResourceImporterBase, ResourceImporterInit } from '../importer'

export class EnemyResourceImporter extends ResourceImporterBase {
  constructor(init: ResourceImporterInit) {
    super(init)
  }

  async introspectType() {
    const file = await this._readJsonFile(
      'gamedata/levels/enemydata/enemy_database.json',
    )
    const tsDef = await quicktypeToTypeScript({
      name: 'ArkEnemy',
      samples: Object.values(file.enemies).flatMap((el) => {
        const value = (el as any)?.Value?.[0]
        if (value) {
          return [JSON.stringify(value)]
        }
        return []
      }),
    })

    return await this._writeTypeDefFile('ArkEnemy', tsDef)
  }

  async import() {
    this.logger.info('importing')
    await this.introspectType()
  }
}
