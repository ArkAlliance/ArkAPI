import { Injectable } from '@nestjs/common'
import { Character, PrismaPromise } from '@prisma/client'

import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getCharacters(): PrismaPromise<Character[]> {
    return this.prismaService.character.findMany()
  }
}
