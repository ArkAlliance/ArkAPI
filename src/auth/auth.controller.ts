import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from 'auth/auth.service'
import { GitHubOAuthCallbackRequest } from 'auth/entities/dto/github-oauth'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('github/callback')
  async githubCallback(@Body() request: GitHubOAuthCallbackRequest) {
    return await this.authService.authorizeGitHubOAuthUser(request.code)
  }
}
