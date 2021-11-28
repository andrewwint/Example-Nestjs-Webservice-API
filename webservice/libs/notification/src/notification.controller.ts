/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';
import { Notification } from './interfaces/notification.interface';
import { JwtAuthGuard } from '@truechoice/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@truechoice/auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'gets all notifications' })
  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationService.getAllNotifications();
  }

  @Get('/auth')
  @ApiOperation({ summary: 'gets all notifications' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user']))
  async getAllAuthNotifications(): Promise<Notification[]> {
    return this.notificationService.getAllNotifications();
  }

  @Post('/new')
  @ApiOperation({ summary: 'creates a notifications' })
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Post('/auth/new')
  @ApiOperation({ summary: 'creates a notifications' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['api', 'user']))
  async createAuthNotification(
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    return this.notificationService.createNotification(createNotificationDto);
  }
}
