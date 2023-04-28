import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { PrismaService } from 'nestjs-prisma'

import { AppModule } from 'app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  const configService = app.get(ConfigService)

  console.log(
    'Starting server on port',
    configService.get('port'),
    configService.get('oauth.github.clientId'),
  )

  await app.listen(configService.get('port')!)
}
bootstrap()
