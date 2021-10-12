import * as mongoose from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule, ScheduleDocument } from './entities/schedule.entity';
export declare class ScheduleService {
    private readonly ScheduleModel;
    constructor(ScheduleModel: mongoose.Model<ScheduleDocument>);
    create(createScheduleDto: CreateScheduleDto): Promise<Schedule & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    findOne(id: string): Promise<Schedule & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    findScheduleForUserMentor(idUserMentor: string, date?: Date): Promise<any[]>;
    findScheduleForUserMentored(idUserMentor: string, date: Date): Promise<any[]>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: string): Promise<void>;
}
