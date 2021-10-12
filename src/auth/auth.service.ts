import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

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
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
