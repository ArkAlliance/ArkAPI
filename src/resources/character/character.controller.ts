import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CharacterService } from './character.service'

@ApiTags('Characters 干员')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  findAll() {
    return this.characterService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id)
  }
}
