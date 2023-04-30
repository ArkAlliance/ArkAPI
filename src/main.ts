import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { PrismaService } from 'nestjs-prisma'

import { AppModule } from 'app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalPipes(new ValidationPipe())

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle('ArkAPI')
    .setDescription(
      'ArkAPI 是由 ArkAlliance 发起的明日方舟资源公共 API，皆在为明日方舟工具站生态提供稳定、易于接入且面向用户体验优化的 API 服务',
    )
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  console.log('Starting server on port', configService.get('port'))

  await app.listen(configService.get('port')!)
}
bootstrap()
