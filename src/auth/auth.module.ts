import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 1,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
