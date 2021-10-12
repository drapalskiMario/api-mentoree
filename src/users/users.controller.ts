import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post()
  create (@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll (@Req() req) {
    return req.user
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
