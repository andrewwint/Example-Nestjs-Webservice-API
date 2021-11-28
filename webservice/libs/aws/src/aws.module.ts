import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  retryDelayOptions: { base: 600 }
});

@Module({
  providers: [AwsService],
  exports: [AwsService]
})
export class AwsModule {}
