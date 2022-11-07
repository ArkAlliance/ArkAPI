import { Injectable } from '@nestjs/common'

import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'

import { Character } from './entities/character.entity'

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return plainToInstance(Character, await this.prisma.character.findMany())
  }

  async findOne(id: string) {
    return plainToInstance(
      Character,
      await this.prisma.character.findUnique({
        where: { id },
      }),
    )
  }
}
