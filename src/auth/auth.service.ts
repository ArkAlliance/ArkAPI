import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async authorizeGitHubOAuthUser(code: string) {
    const { data: token } = await this.httpService.axiosRef.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.configService.get('oauth.github.clientId'),
        client_secret: this.configService.get('oauth.github.clientSecret'),
        code,
      },
      {
        headers: {
          accept: 'application/json',
        },
      },
    )

    const { data: profile } = await this.httpService.axiosRef.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `token ${token.access_token}`,
        },
      },
    )

    return await this.prisma.user.upsert({
      where: {
        oauthUserId: profile.id,
      },
      update: {},
      create: {
        avatarUrl: profile.avatar_url,
        email: profile.email,
        name: profile.name,
        username: profile.login,
        oauthUserId: profile.id,
        oauthAccessToken: token.access_token,
      },
    })
  }
}
