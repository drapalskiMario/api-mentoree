import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { config } from 'aws-sdk'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  config.update({
    accessKeyId: configService.get('ACCESS_KEY_ID_AWS'),
    secretAccessKey: configService.get('SECRET_KEY_AWS'),
    region: configService.get('AWS_REGION')
  })

  await app.listen(configService.get('PORT'))
}
bootstrap()
