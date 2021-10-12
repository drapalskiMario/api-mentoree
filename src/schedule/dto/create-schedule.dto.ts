import { IsNumber, IsString, Min, Max, IsDateString } from 'class-validator'

export class CreateScheduleDto {
  @IsDateString()
  date: Date

  @Min(1)
  @Max(23)
  @IsNumber()
  hour: number

  @IsString()
  idMentor: string
}
