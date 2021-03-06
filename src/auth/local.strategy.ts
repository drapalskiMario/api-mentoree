
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate (email: string, password: string): Promise<any> {
    const userIsValid = await this.authService.validateUser(email, password)
    if (userIsValid) {
      return userIsValid
    }
    throw new HttpException('wrong credential is provided', HttpStatus.UNAUTHORIZED)
  }
}
