import { Args, Query, Resolver } from '@nestjs/graphql'

import { CharacterService } from './character.service'

import { Character } from './entities/character.entity'

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [Character], { name: 'character' })
  findAll() {
    return this.characterService.findAll()
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('id') id: string) {
    return this.characterService.findOne(id)
  }
}
