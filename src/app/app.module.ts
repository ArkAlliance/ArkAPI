import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from 'nestjs-prisma'

import { CharacterModule } from 'resources/character/character.module'

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/generated.gql'),
    }),
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
