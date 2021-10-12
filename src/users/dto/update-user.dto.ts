import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional, IsString, IsUrl } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsUrl()
  uriPhoto?: string

  @IsOptional()
  @IsString()
  token?: string
}
