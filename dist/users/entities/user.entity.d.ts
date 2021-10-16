import { Document } from 'mongoose';
export declare class User {
    name: string;
    email: string;
    linkedIn: string;
    password: string;
    isMentor: boolean;
    about: string;
    workplace: string;
    job: string;
    specialties: string;
    seniority: 'Junior' | 'Pleno' | 'Sênior';
    image?: string;
    imageKey?: string;
    token: string;
}
export declare type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
