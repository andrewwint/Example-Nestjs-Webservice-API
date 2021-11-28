/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */
export interface UserToken {
  readonly id?: string;
  readonly username?: string;
  readonly name?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly roles?: string[];
  readonly role?: string;
  readonly lastlogin?: Date;
}
