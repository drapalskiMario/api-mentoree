import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Document } from 'mongoose'

@Schema()
export class Schedule {
  @Prop({ required: true })
  date: Date

  @Prop({ required: true })
  hour: number

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  idMentor: string

  @Prop({ type: SchemaTypes.ObjectId, default: null })
  idMentored: string | null

  @Prop()
  about?: string
}

export type ScheduleDocument = Schedule & Document

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
