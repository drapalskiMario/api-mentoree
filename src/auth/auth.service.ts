import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser (email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (user) {
      const passwordIsCorrect = bcrypt.compareSync(password, user.password)
      return passwordIsCorrect ? user : null
    }
    return null
  }

  async login (user: any) {
    const payload = { id: user._id, isMentor: user.isMentor }
    const token = this.jwtService.sign(payload)
    await this.usersService.update(user._id, { token }, user._id)
    return {
      access_token: token
    }
  }
}
