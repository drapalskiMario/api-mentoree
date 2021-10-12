"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleWhitoutMentoredQuery = exports.scheduleWhitMentoredQuery = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const scheduleWhitMentoredQuery = (idUserMentor, date) => {
    if (date) {
        return [{ $match: { idMentor: new mongoose_1.default.Types.ObjectId(idUserMentor), date } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'idMentored',
                    foreignField: '_id',
                    as: 'mentored'
                }
            },
            {
                $unwind: '$mentored'
            },
            {
                $project: {
                    date: '$date',
                    hour: '$hour',
                    mentored: '$mentored.name',
                    about: '$about'
                }
            }];
    }
    else {
        return [{ $match: { idMentor: new mongoose_1.default.Types.ObjectId(idUserMentor) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'idMentored',
                    foreignField: '_id',
                    as: 'mentored'
                }
            },
            {
                $unwind: '$mentored'
            },
            {
                $project: {
                    date: '$date',
                    hour: '$hour',
                    mentored: '$mentored.name',
                    about: '$about'
                }
            }];
    }
};
exports.scheduleWhitMentoredQuery = scheduleWhitMentoredQuery;
const scheduleWhitoutMentoredQuery = (idUserMentor, date) => ([
    { $match: { idMentor: new mongoose_1.default.Types.ObjectId(idUserMentor), date, isMentored: null } },
    {
        $project: {
            date: '$date',
            hour: '$hour',
            mentored: null
        }
    }
]);
exports.scheduleWhitoutMentoredQuery = scheduleWhitoutMentoredQuery;
//# sourceMappingURL=aggregation.query.js.map