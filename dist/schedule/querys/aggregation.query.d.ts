import mongoose from 'mongoose';
export declare const scheduleWhitMentoredQuery: (idUserMentor: string, date?: Date) => ({
    $match: {
        idMentor: mongoose.Types.ObjectId;
        date: Date;
    };
    $lookup?: undefined;
    $unwind?: undefined;
    $project?: undefined;
} | {
    $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
    };
    $match?: undefined;
    $unwind?: undefined;
    $project?: undefined;
} | {
    $unwind: string;
    $match?: undefined;
    $lookup?: undefined;
    $project?: undefined;
} | {
    $project: {
        date: string;
        hour: string;
        mentored: string;
        about: string;
    };
    $match?: undefined;
    $lookup?: undefined;
    $unwind?: undefined;
})[] | ({
    $match: {
        idMentor: mongoose.Types.ObjectId;
    };
    $lookup?: undefined;
    $unwind?: undefined;
    $project?: undefined;
} | {
    $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
    };
    $match?: undefined;
    $unwind?: undefined;
    $project?: undefined;
} | {
    $unwind: string;
    $match?: undefined;
    $lookup?: undefined;
    $project?: undefined;
} | {
    $project: {
        date: string;
        hour: string;
        mentored: string;
        about: string;
    };
    $match?: undefined;
    $lookup?: undefined;
    $unwind?: undefined;
})[];
export declare const scheduleWhitoutMentoredQuery: (idUserMentor: string, date: Date) => ({
    $match: {
        idMentor: mongoose.Types.ObjectId;
        date: Date;
        isMentored: any;
    };
    $project?: undefined;
} | {
    $project: {
        date: string;
        hour: string;
        mentored: any;
    };
    $match?: undefined;
})[];
