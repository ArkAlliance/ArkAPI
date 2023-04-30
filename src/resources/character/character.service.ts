import { Injectable } from '@nestjs/common'
import { ArkCharacter } from '@prisma/client'

import { plainToInstance } from 'class-transformer'
import { RequestCommonQuery } from 'common/request'
import { PrismaService } from 'nestjs-prisma'

import { Character } from './entities/character.entity'

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async findAll({ server }: RequestCommonQuery) {
    const characters: ArkCharacter[] = await this.prisma.arkCharacter.findMany({
      where: { server },
    })
    const instances = plainToInstance(Character, characters)
    return instances
  }

  async findOne({ server }: RequestCommonQuery, { id }: { id: string }) {
    return plainToInstance(
      Character,
      await this.prisma.arkCharacter.findFirst({
        where: { id, server },
      }),
    )
  }
}
