/// <reference types="multer" />
/// <reference types="node" />
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
export declare class UsersService {
    private readonly UserModel;
    private jwtService;
    constructor(UserModel: Model<UserDocument>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    findAll(isMentor: boolean): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    findAllBySpecialties(specialties: string): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findByEmail(email: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, idByToken: string, file?: Express.Multer.File): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: string, idByToken: string): Promise<void>;
    uploadFile(dataBuffer: Buffer, filename: string): Promise<{
        image: string;
        imageKey: string;
    }>;
    deletingFile(imageKey: string): Promise<void>;
}
