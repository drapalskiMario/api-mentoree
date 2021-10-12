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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleWhitoutMentoredQuery = exports.scheduleWhitMentoredQuery = void 0;
const mongoose = __importStar(require("mongoose"));
const scheduleWhitMentoredQuery = (idUserMentor, date) => {
    if (date) {
        return [{ $match: { idMentor: new mongoose.Types.ObjectId(idUserMentor), date } },
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
        return [{ $match: { idMentor: new mongoose.Types.ObjectId(idUserMentor) } },
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
    { $match: { idMentor: new mongoose.Types.ObjectId(idUserMentor), date, isMentored: null } },
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