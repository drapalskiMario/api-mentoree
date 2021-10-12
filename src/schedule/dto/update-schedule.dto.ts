import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'
import { CreateScheduleDto } from './create-schedule.dto'

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @IsOptional()
  @IsString()
  idMentored?: string

  @IsOptional()
  @IsString()
  about?: string
}
