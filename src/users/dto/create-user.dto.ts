/* eslint-disable no-unused-vars */
import { IsString, IsEmail, IsUrl, IsEnum, IsBoolean, ValidateIf } from 'class-validator'

enum Seniority {
  Junior = 'Junior',
  Pleno = 'Pleno',
  Sênior = 'Sênior'
}

enum Specialties {
  Desing = 'Desing',
  DesenvolvimentoDeSoftware = 'Desenvolvimento de Software',
  Marketing = 'Marketing',
  Vendas = 'Vendas'
}
export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsUrl()
  linkedIn: string

  @IsString()
  password: string

  @IsBoolean()
  isMentor: boolean

  @IsString()
  about: string

  @IsString()
  workplace: string

  @IsString()
  job: string

  @ValidateIf(prop => prop.isMentor === true)
  @IsEnum(Specialties)
  specialties: Specialties

  @ValidateIf(prop => prop.isMentor === true)
  @IsEnum(Seniority)
  seniority: Seniority
}
