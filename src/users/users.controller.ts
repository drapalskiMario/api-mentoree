import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common'
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll () {
    return this.usersService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.usersService.findOne(id)
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
