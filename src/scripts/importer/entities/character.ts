import { ArkCharacterValueUnion } from 'models/generated/ArkCharacter'
import { quicktypeToTypeScript } from 'scripts/importer/quicktype'
import { generateId } from 'scripts/importer/utils/snowflake'
import type { JsonObject } from 'type-fest'
import { ResourceImporterBase, ResourceImporterInit } from '../importer'

export class CharacterResourceImporter extends ResourceImporterBase {
  constructor(init: ResourceImporterInit) {
    super(init)
  }

  async introspectType() {
    const file = await this._readJsonFile('gamedata/excel/character_table.json')
    const tsDef = await quicktypeToTypeScript({
      name: 'ArkCharacter' + this.server,
      samples: [JSON.stringify(file)],
    })

    return await this._writeTypeDefFile('ArkCharacter', tsDef)
  }

  async import() {
    this.logger.info('importing')
    await this.introspectType()

    const content = await this._readJsonFile(
      'gamedata/excel/character_table.json',
    )

    for (const [
      characterId,
      character,
    ] of Object.entries<ArkCharacterValueUnion>(content as any)) {
      if (character.profession === 'TOKEN' || character.profession === 'TRAP')
        continue

      if (character.position === 'ALL' || character.position === 'NONE') {
        this.logger.warn(
          `character ${characterId} has invalid position ${character.position}`,
        )
        continue
      }

      const override = {
        name: character.name,
        profession: character.profession,
        position: character.position,
        rarity: character.rarity,

        data: character as unknown as JsonObject,
      }

      await this.prisma.arkCharacter.upsert({
        where: {
          server_gameId: {
            server: this.server,
            gameId: characterId,
          },
        },
        create: {
          id: 'arkchar_' + generateId(),
          server: this.server,
          gameId: characterId,

          ...override,
        },
        update: override,
      })
    }
  }
}
