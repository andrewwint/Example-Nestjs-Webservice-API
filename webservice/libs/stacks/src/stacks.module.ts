import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StacksService } from './stacks.service';
import { NotificationModule } from '@truechoice/notification';
import { AwsModule, AwsService } from '@truechoice/aws';
import { InstanceSchema } from './schemas/instance.schema';
import { StackRepository } from './repositories/stack-repository';
import { StacksController } from './stacks.controller';
import { StacksAuthController } from './stacks-auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Instance', schema: InstanceSchema }]),
    AwsModule,
    NotificationModule
  ],
  providers: [StacksService, StackRepository, AwsService],
  exports: [MongooseModule, StacksService, StackRepository],
  controllers: [StacksController, StacksAuthController]
})
export class StacksModule {}
