import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('schedule')
export class ScheduleController {
  constructor (private readonly scheduleService: ScheduleService) {}

  @Post()
  create (@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto)
  }

  @Get()
  findAll (@Req() req, @Query() query) {
    if (req.user.isMentor === true && !query.date) {
      return this.scheduleService.findScheduleForUserMentor(req.user.id)
    }
    if (req.user.isMentor === true && query.date) {
      return this.scheduleService.findScheduleForUserMentor(req.user.id, new Date(query.date))
    }
    if (query.idmentor && query.date) {
      return this.scheduleService.findScheduleForUserMentored(query.idmentor, new Date(query.date))
    }
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.scheduleService.remove(id)
  }
}
