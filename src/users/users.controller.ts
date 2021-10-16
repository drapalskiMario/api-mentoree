import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, UseInterceptors, UploadedFile, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post()
  create (@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('/mentors')
  findAll (@Query() query) {
    if (query.specialties) {
      return this.usersService.findAllBySpecialties(query.specialties)
    } else {
      return this.usersService.findAll(true)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/mentoreds')
  findOne () {
    return this.usersService.findAll(false)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update (
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.update(id, updateUserDto, req.user.id, image)
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove (@Param('id') id: string, @Req() req) {
    return this.usersService.remove(id, req.user.id)
  }
}
