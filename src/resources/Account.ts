import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { File } from './File'
import { Expandable } from './shared'

export interface Account {
  /**
   * Always `account`.
   */
  object: 'account'
  /**
   * Unique ID of the account.
   */
  id: string
  /**
   * Name for the account.
   */
  name: string
  /**
   * Subdomain for the account.
   */
  subdomain: string
  /**
   * Pointer to the file that should be used as the logo for this account
   */
  logo: Expandable<File> | null
  /**
   * The time zone associated with this account. This value is rarely used in Source,
   * however it serves an important purpose for appointment booking. In order to
   * ensure each day has consistent appointment slots available, we use this time
   * zone to determine when midnight is for your organization. Slots will reset when
   * crossing midnight into the next day. You can read more about this in the
   * documentation for the [Slot resource](../slot/).
   */
  time_zone: string
  /**
   * Test mode API secret key for the account, only returned during account creation.
   */
  test_secret_key?: string
  /**
   * Live mode API secret key for the account, only returned during account creation.
   */
  live_secret_key?: string
  /**
   * Timestamp when the account was created.
   */
  created_at: string
  /**
   * Timestamp when the account was last updated.
   */
  updated_at: string
}

export interface AccountUpdateParams {
  /**
   * Name for the account.
   */
  name?: string
  /**
   * Subdomain for the account.
   */
  subdomain?: string
  /**
   * The time zone identifier for this account. Account level time zone identifiers
   * are used to determine when "midnight" exists for your practice, and feed into
   * Source's understanding of your organization's business hours. Note that each
   * user has their own time zone as well, which is what is used when declaring user
   * availability and booking appointments.
   */
  time_zone?: string
  /**
   * Pointer to the file to use as the logo for this account. Must be of purpose
   * account_logo.
   */
  logo?: string | null
}

export class AccountResource extends Resource {
  /**
   * Retrieves the details of an account.
   *
   * Supply the unique identifier of the account, or `current` to access your current
   * account.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Account> {
    return this.source.request('GET', `/v1/accounts/${id}`, {
      options,
    })
  }

  /**
   * Updates an account. At this time you can only update the account name and
   * subdomain.
   *
   * Any parameters that are not provided in the request will be left unchanged.
   */
  public update(
    id: string,
    params?: AccountUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Account> {
    return this.source.request('POST', `/v1/accounts/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
