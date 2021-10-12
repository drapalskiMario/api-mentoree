import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  linkedIn: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  isMentor: boolean

  @Prop({ required: true })
  about: string

  @Prop({ required: true })
  workplace: string

  @Prop({ required: true })
  job: string

  @Prop({ type: String, enum: ['Desing', 'Desenvolvimento de Software', 'Marketing', 'Vendas'] })
  specialties: string

  @Prop({ type: String, enum: ['Junior', 'Pleno', 'Sênior'] })
  seniority: 'Junior' | 'Pleno' | 'Sênior'

  @Prop({ type: [String], required: true })
  skillsOrInterests: string[]

  @Prop()
  image?: string

  @Prop()
  imageKey?: string

  @Prop({ required: true })
  token: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
