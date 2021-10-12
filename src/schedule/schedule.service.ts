import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { Schedule, ScheduleDocument } from './entities/schedule.entity'
import { scheduleWhitMentoredQuery, scheduleWhitoutMentoredQuery } from './querys/aggregation.query'

@Injectable()
export class ScheduleService {
  constructor (@InjectModel(Schedule.name) private readonly ScheduleModel: mongoose.Model<ScheduleDocument>) { }

  async create (createScheduleDto: CreateScheduleDto) {
    const { date, hour, idMentor } = createScheduleDto
    const scheduleClosed = await this.ScheduleModel.findOne({ date: new Date(date), hour, idMentor })
    if (!scheduleClosed) {
      const createSchedule = new this.ScheduleModel(createScheduleDto)
      return createSchedule.save()
    }
    throw new HttpException('the time is already scheduled', HttpStatus.FORBIDDEN)
  }

  async findOne (id: string) {
    const schedule = await this.ScheduleModel.findById(id)
    if (schedule) {
      return schedule
    }
    throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND)
  }

  async findScheduleForUserMentor (idUserMentor: string, date?: Date) {
    if (date) {
      const scheduleWhitMentored = await this.ScheduleModel.aggregate(scheduleWhitMentoredQuery(idUserMentor, date))
      const scheduleWhitoutMentored = await this.ScheduleModel.aggregate(scheduleWhitoutMentoredQuery(idUserMentor, date))
      return scheduleWhitoutMentored.concat(scheduleWhitMentored)
    }
    return await this.ScheduleModel.aggregate(scheduleWhitMentoredQuery(idUserMentor, date))
  }

  async findScheduleForUserMentored (idUserMentor: string, date: Date) {
    if (date) {
      return await this.ScheduleModel.aggregate(scheduleWhitoutMentoredQuery(idUserMentor, date))
    }
  }

  async update (id: string, updateScheduleDto: UpdateScheduleDto) {
    if (updateScheduleDto.idMentor !== updateScheduleDto.idMentored) {
      const schedule = await this.ScheduleModel.findById(id)
      if (schedule) {
        return this.ScheduleModel.findByIdAndUpdate({ _id: id }, { $set: updateScheduleDto }, { new: true })
      }
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND)
    }
    throw new HttpException('IdMentor and IdMentored don\'t be equals', HttpStatus.BAD_REQUEST)
  }

  async remove (id: string) {
    const scheduleDeleted = await this.ScheduleModel.deleteOne({ _id: id })
    if (scheduleDeleted.deletedCount) {
      return
    }
    throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND)
  }
}
