import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) { }

  async create (createUserDto: CreateUserDto) {
    const user = await this.UserModel.findOne({ email: createUserDto.email })
    if (!user) {
      createUserDto.password = bcrypt.hashSync(createUserDto.password)
      const createdUser = new this.UserModel(createUserDto)
      return createdUser.save()
    }
    throw new HttpException('The received email is already in use', HttpStatus.FORBIDDEN)
  }

  findAll () {
    return this.UserModel.find().exec()
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

  async update (id: string, updateUserDto: UpdateUserDto) {
    const mentorExists = await this.UserModel.findById(id)
    if (mentorExists) {
      return this.UserModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async remove (id: string) {
    const userDeleted = await this.UserModel.deleteOne({ _id: id })
    if (userDeleted.deletedCount) {
      return
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }
}
