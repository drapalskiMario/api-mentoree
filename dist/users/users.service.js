"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const aws_sdk_1 = require("aws-sdk");
const bcrypt = __importStar(require("bcryptjs"));
const path_1 = require("path");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const user = await this.UserModel.findOne({ email: createUserDto.email });
        if (!user) {
            createUserDto.password = bcrypt.hashSync(createUserDto.password);
            const createdUser = new this.UserModel(createUserDto);
            createdUser.token = this.jwtService.sign({ id: createdUser._id, isMentor: createdUser.isMentor });
            await createdUser.save();
            return { access_token: createdUser.token };
        }
        throw new common_1.HttpException('The received email is already in use', common_1.HttpStatus.FORBIDDEN);
    }
    findAll() {
        return this.UserModel.find().exec();
    }
    async findOne(id) {
        const user = await this.UserModel.findById(id);
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
    async findByEmail(email) {
        const user = await this.UserModel.findOne({ email });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateUserDto, idByToken, file) {
        if (id === idByToken) {
            const mentorExists = await this.UserModel.findById(id);
            if (mentorExists) {
                if (file) {
                    if (mentorExists.image && mentorExists.imageKey) {
                        await this.deletingFile(mentorExists.imageKey);
                    }
                    const imageSaved = await this.uploadFile(file.buffer, file.originalname);
                    updateUserDto.image = imageSaved.image;
                    updateUserDto.imageKey = imageSaved.imageKey;
                }
                return this.UserModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('access unauthorized', common_1.HttpStatus.UNAUTHORIZED);
    }
    async remove(id, idByToken) {
        if (id === idByToken) {
            const userDeleted = await this.UserModel.deleteOne({ _id: id });
            if (userDeleted.deletedCount) {
                return;
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('access unauthorized', common_1.HttpStatus.UNAUTHORIZED);
    }
    async uploadFile(dataBuffer, filename) {
        const s3 = new aws_sdk_1.S3();
        const uploadResult = await s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Body: dataBuffer,
            Key: `${new Date().valueOf()}${(0, path_1.extname)(filename)}`,
            ContentType: 'valid content type'
        }).promise();
        const image = uploadResult.Location;
        const imageKey = uploadResult.Key;
        return { image, imageKey };
    }
    async deletingFile(imageKey) {
        const s3 = new aws_sdk_1.S3();
        await s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: imageKey
        }).promise();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map