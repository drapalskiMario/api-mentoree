/// <reference types="multer" />
/// <reference types="mongoose" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    findAll(): Promise<(import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, req: any, image: Express.Multer.File): Promise<import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: string, req: any): Promise<void>;
}
