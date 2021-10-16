import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import { S3 } from 'aws-sdk'
import { Express } from 'express'
import * as bcrypt from 'bcryptjs'
import { extname } from 'path'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async create (createUserDto: CreateUserDto) {
    const user = await this.UserModel.findOne({ email: createUserDto.email })
    if (!user) {
      createUserDto.password = bcrypt.hashSync(createUserDto.password)
      const createdUser = new this.UserModel(createUserDto)
      createdUser.token = this.jwtService.sign({ id: createdUser._id, isMentor: createdUser.isMentor })
      await createdUser.save()
      return { access_token: createdUser.token }
    }
    throw new HttpException('The received email is already in use', HttpStatus.FORBIDDEN)
  }

  findAll (isMentor: boolean) {
    return this.UserModel.find({ isMentor }).exec()
  }

  findAllBySpecialties (specialties: string) {
    return this.UserModel.find({ specialties }).exec()
  }

  async findOne (id: string) {
    const user = await this.UserModel.findById(id)
    if (user) {
      return user
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async findByEmail (email: string) {
    const user = await this.UserModel.findOne({ email })
    if (user) {
      return user
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async update (id: string, updateUserDto: UpdateUserDto, idByToken: string, file?: Express.Multer.File) {
    if (id === idByToken) {
      const mentorExists = await this.UserModel.findById(id)
      if (mentorExists) {
        if (file) {
          if (mentorExists.image && mentorExists.imageKey) {
            await this.deletingFile(mentorExists.imageKey)
          }
          const imageSaved = await this.uploadFile(file.buffer, file.originalname)
          updateUserDto.image = imageSaved.image
          updateUserDto.imageKey = imageSaved.imageKey
        }
        return this.UserModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    throw new HttpException('access unauthorized', HttpStatus.UNAUTHORIZED)
  }

  async remove (id: string, idByToken: string) {
    if (id === idByToken) {
      const userDeleted = await this.UserModel.deleteOne({ _id: id })
      if (userDeleted.deletedCount) {
        return
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    throw new HttpException('access unauthorized', HttpStatus.UNAUTHORIZED)
  }

  async uploadFile (dataBuffer: Buffer, filename: string) {
    const s3 = new S3()
    const uploadResult = await s3.upload({
      Bucket: process.env.BUCKET_NAME,
      Body: dataBuffer,
      Key: `${new Date().valueOf()}${extname(filename)}`,
      ContentType: 'valid content type'
    }).promise()

    const image = uploadResult.Location
    const imageKey = uploadResult.Key
    return { image, imageKey }
  }

  async deletingFile (imageKey: string) {
    const s3 = new S3()
    await s3.deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: imageKey
    }).promise()
  }
}
