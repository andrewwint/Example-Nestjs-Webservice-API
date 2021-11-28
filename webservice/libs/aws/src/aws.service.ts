/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Injectable, Logger } from '@nestjs/common';
import { EC2 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private logger = new Logger('AwsService');
  public instances = undefined;

  /**@async
   * @description: Performs AWS EC2 `describeInstance` find all the instances with a specfic Tag key value pair
   *
   * @param  {string} filterKey @example 'production-us-east-1-ip'
   * @param  {string} filterTagName @default 'StackName'
   * @param  {Promise} empty Sets this.instanances to `describeInstance` output
   */
  async describeInstance(
    filterKey: string,
    filterTagName: string = 'StackName'
  ): Promise<EC2.DescribeInstancesResult[]> {
    const ec2: EC2 = new EC2({
      apiVersion: '2016-11-15',
      region: this.getRegionByFilterKey(filterKey.trim())
    });

    this.instances = await ec2
      .describeInstances({
        Filters: [{ Name: `tag:${filterTagName}`, Values: [filterKey.trim()] }]
      })
      .promise()
      .then((data) => {
        this.logger.log(`Found ${data.Reservations.length} instanaces for ${filterKey}`);
        return data.Reservations;
      })
      .catch((error) => {
        this.logger.error(`Error with finding instanaces for ${filterKey}`, error);
      });

    return this.instances;
  }

  /**
   * @description Extracts substring from a larger string
   *              finds 'us-east-2' within 'staging-us-east-2-solstice'
   *              defualt is 'us-east-1'
   *
   * @param  {String} filterKey
   * @returns {string} @default 'us-east-1'
   */
  getRegionByFilterKey(filterKey: String): string {
    const parts = filterKey.split('-');
    let region = 'us-east-1';

    if (!isNaN(parseInt(parts[3]))) {
      region = `${parts[1]}-${parts[2]}-${parts[3]}`;
    }

    this.logger.log(`Found region ${region} in ${filterKey}`);
    return region;
  }
}
