import { Document } from 'mongoose';
export declare class Schedule {
    date: Date;
    hour: number;
    idMentor: string;
    idMentored: string | null;
    about?: string;
}
export declare type ScheduleDocument = Schedule & Document;
export declare const ScheduleSchema: import("mongoose").Schema<Document<Schedule, any, any>, import("mongoose").Model<Document<Schedule, any, any>, any, any, any>, {}>;
