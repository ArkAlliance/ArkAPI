import { IsNotEmpty } from 'class-validator'

export class GitHubOAuthCallbackRequest {
  @IsNotEmpty()
  code: string
}

export class GitHubOAuthCallbackResponse {}
