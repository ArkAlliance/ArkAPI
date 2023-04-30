import { Args, Query, Resolver } from '@nestjs/graphql'
import { ArkServer } from '@prisma/client'

import { CharacterService } from './character.service'

import { Character } from './entities/character.entity'

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [Character], { name: 'characters' })
  findAll(@Args('server') server: ArkServer) {
    return this.characterService.findAll({ server })
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('server') server: ArkServer, @Args('id') id: string) {
    return this.characterService.findOne({ server }, { id })
  }
}
