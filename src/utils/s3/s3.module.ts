import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
