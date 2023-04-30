import { IsNotEmpty } from 'class-validator'

export class GitHubOAuthCallbackRequest {
  @IsNotEmpty()
  code: string

  @IsNotEmpty()
  state: string
}

export class GitHubOAuthCallbackResponse {}
