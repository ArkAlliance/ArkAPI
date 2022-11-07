import { NestFactory } from '@nestjs/core'

import { PrismaService } from 'nestjs-prisma'

import { AppModule } from 'app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3010)
}
bootstrap()
