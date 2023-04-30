import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ArkServer } from '@prisma/client'
import { CommonQuery } from 'adornments/decorators/commonQuery'
import { Character } from 'resources/character/entities/character.entity'

import { CharacterService } from './character.service'

@ApiTags('Characters 干员')
@Controller('servers/:server/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @CommonQuery()
  findAll(@Param('server') server: ArkServer): Promise<Character[]> {
    return this.characterService.findAll({ server })
  }

  @Get(':id')
  @CommonQuery()
  findOne(
    @Param('server') server: ArkServer,
    @Param('id') id: string,
  ): Promise<Character> {
    return this.characterService.findOne({ server }, { id })
  }
}
