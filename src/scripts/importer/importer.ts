import { ArkServer, PrismaClient } from '@prisma/client'
import { logger } from 'common/logger'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Logger } from 'pino'

export interface ResourceImporterInit {
  server: ArkServer
  resourceBasePath: string
  prisma: PrismaClient
}

const serverToResourcePathMapping: Record<ArkServer, string> = {
  CN: 'zh_CN',
  US: 'en_US',
  JP: 'ja_JP',
  KR: 'ko_KR',
  TW: 'zh_TW',
}

export class ResourceImporterBase {
  public readonly server: ArkServer
  public readonly resourceBasePath: string
  public readonly prisma: PrismaClient
  public logger: Logger

  constructor({ server, resourceBasePath, prisma }: ResourceImporterInit) {
    this.server = server
    this.resourceBasePath = resourceBasePath
    this.prisma = prisma
    this.logger = logger.child({ name: 'importer', server, resourceBasePath })
  }

  async import() {
    throw new Error('Not implemented')
  }

  protected _getFilePath(filePath: string) {
    const serverResourcePath = serverToResourcePathMapping[this.server]
    return path.join(this.resourceBasePath, serverResourcePath, filePath)
  }

  protected async _readJsonFile(filePath: string) {
    const content = await fs.readFile(this._getFilePath(filePath), 'utf-8')
    return JSON.parse(content)
  }

  protected _getTypeDefFilePath(typeName: string) {
    const base = path.join(
      'src/models/generated',
      this.server,
      typeName + '.d.ts',
    )
    return base
  }

  protected async _writeTypeDefFile(typeName: string, content: string) {
    const filePath = this._getTypeDefFilePath(typeName)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, content)
  }

  protected async _checkTypeDefFileExists(typeName: string) {
    try {
      await fs.access(this._getTypeDefFilePath(typeName))
      return true
    } catch (e) {
      return false
    }
  }
}
