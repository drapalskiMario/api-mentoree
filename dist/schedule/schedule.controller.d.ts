/// <reference types="mongoose" />
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    create(createScheduleDto: CreateScheduleDto): Promise<import("./entities/schedule.entity").Schedule & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(req: any, query: any): Promise<any[]>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<import("./entities/schedule.entity").Schedule & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: string): Promise<void>;
}
