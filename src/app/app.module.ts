import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

import { join } from 'path'

import { AuthModule } from 'auth/auth.module'
import { PrismaModule } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { configure, configureSchema } from 'config'
import { CharacterModule } from 'resources/character/character.module'
import GraphQLJSON from 'graphql-type-json'

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/generated.gql'),
      buildSchemaOptions: {},
      persistedQueries: {
        ttl: 900,
      },
      resolvers: { JSON: GraphQLJSON },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configure],
      validationSchema: configureSchema,
    }),
    CharacterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
