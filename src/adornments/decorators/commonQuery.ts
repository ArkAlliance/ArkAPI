import { applyDecorators } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { ArkServer } from '@prisma/client'

export function CommonQuery() {
  return applyDecorators(ApiParam({ name: 'server', enum: ArkServer }))
}
