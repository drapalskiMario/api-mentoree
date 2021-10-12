import mongoose from 'mongoose'

export const scheduleWhitMentoredQuery = (idUserMentor: string, date?: Date) => {
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
      }]
  } else {
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
    }]
  }
}

export const scheduleWhitoutMentoredQuery = (idUserMentor: string, date: Date) => ([
  { $match: { idMentor: new mongoose.Types.ObjectId(idUserMentor), date, isMentored: null } },
  {
    $project: {
      date: '$date',
      hour: '$hour',
      mentored: null
    }
  }
])
