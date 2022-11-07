import { Controller, Get } from '@nestjs/common'
import { Character } from '@prisma/client'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<Character[]> {
    const characters = await this.appService.getCharacters()
    return characters
  }
}
