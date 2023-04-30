import { Injectable } from '@nestjs/common'
import { ArkCharacter } from '@prisma/client'

import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'

import { Character } from './entities/character.entity'

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const characters: ArkCharacter[] = await this.prisma.arkCharacter.findMany()
    const instances = plainToInstance(Character, characters)
    return instances
  }

  async findOne(id: string) {
    return plainToInstance(
      Character,
      await this.prisma.arkCharacter.findUnique({
        where: { id },
      }),
    )
  }
}
