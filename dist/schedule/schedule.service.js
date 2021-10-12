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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
const schedule_entity_1 = require("./entities/schedule.entity");
const aggregation_query_1 = require("./querys/aggregation.query");
let ScheduleService = class ScheduleService {
    constructor(ScheduleModel) {
        this.ScheduleModel = ScheduleModel;
    }
    async create(createScheduleDto) {
        const { date, hour, idMentor } = createScheduleDto;
        const scheduleClosed = await this.ScheduleModel.findOne({ date: new Date(date), hour, idMentor });
        if (!scheduleClosed) {
            const createSchedule = new this.ScheduleModel(createScheduleDto);
            return createSchedule.save();
        }
        throw new common_1.HttpException('the time is already scheduled', common_1.HttpStatus.FORBIDDEN);
    }
    async findOne(id) {
        const schedule = await this.ScheduleModel.findById(id);
        if (schedule) {
            return schedule;
        }
        throw new common_1.HttpException('Schedule not found', common_1.HttpStatus.NOT_FOUND);
    }
    async findScheduleForUserMentor(idUserMentor, date) {
        if (date) {
            const scheduleWhitMentored = await this.ScheduleModel.aggregate((0, aggregation_query_1.scheduleWhitMentoredQuery)(idUserMentor, date));
            const scheduleWhitoutMentored = await this.ScheduleModel.aggregate((0, aggregation_query_1.scheduleWhitoutMentoredQuery)(idUserMentor, date));
            return scheduleWhitoutMentored.concat(scheduleWhitMentored);
        }
        return await this.ScheduleModel.aggregate((0, aggregation_query_1.scheduleWhitMentoredQuery)(idUserMentor, date));
    }
    async findScheduleForUserMentored(idUserMentor, date) {
        if (date) {
            return await this.ScheduleModel.aggregate((0, aggregation_query_1.scheduleWhitoutMentoredQuery)(idUserMentor, date));
        }
    }
    async update(id, updateScheduleDto) {
        if (updateScheduleDto.idMentor !== updateScheduleDto.idMentored) {
            const schedule = await this.ScheduleModel.findById(id);
            if (schedule) {
                return this.ScheduleModel.findByIdAndUpdate({ _id: id }, { $set: updateScheduleDto }, { new: true });
            }
            throw new common_1.HttpException('Schedule not found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('IdMentor and IdMentored don\'t be equals', common_1.HttpStatus.BAD_REQUEST);
    }
    async remove(id) {
        const scheduleDeleted = await this.ScheduleModel.deleteOne({ _id: id });
        if (scheduleDeleted.deletedCount) {
            return;
        }
        throw new common_1.HttpException('Schedule not found', common_1.HttpStatus.NOT_FOUND);
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedule_entity_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map