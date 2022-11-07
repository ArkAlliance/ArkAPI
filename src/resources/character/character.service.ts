import { Injectable } from '@nestjs/common'

import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.character.findMany()
  }

  findOne(id: string) {
    return this.prisma.character.findUnique({
      where: { id },
    })
  }
}
