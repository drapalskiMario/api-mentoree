import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ScheduleModule } from './schedule/schedule.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.URI_MONGO), ScheduleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
