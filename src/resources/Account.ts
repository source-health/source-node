import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'

interface Account {
  /**
   * Always `account`.
   */
  readonly object: string

  /**
   * Unique ID of the account.
   */
  readonly id: string

  /**
   * Name for the account.
   */
  readonly name: string

  /**
   * Subdomain for the account.
   */
  readonly subdomain: string

  /**
   * Test mode API secret key for the account, only returned during account creation.
   */
  readonly test_secret_key?: string

  /**
   * Live mode API secret key for the account, only returned during account creation.
   */
  readonly live_secret_key?: string

  /**
   * Timestamp when the account was created.
   */
  readonly created_at: string

  /**
   * Timestamp when the account was last updated.
   */
  readonly updated_at: string
}

interface UpdateAnAccountParams {
  /**
   * Name for the account.
   */
  readonly name?: string

  /**
   * Subdomain for the account.
   */
  readonly subdomain?: string
}

export class AccountContext extends BaseContext {
  /**
   * Retrieves the details of an account.
   *
   * Supply the unique identifier of the account, or `current` to access your current account.
   *
   * @param id Unique ID of the account
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Account> {
    return this.catalyst.request('GET', `/v1/accounts/${id}`, {
      options,
    })
  }

  /**
   * Updates an account. At this time you can only update the account name and subdomain.
   *
   * Any parameters that are not provided in the request will be left unchanged.
   *
   * @param id Unique ID of the account
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async update(
    id: string,
    params?: UpdateAnAccountParams,
    options?: CatalystOptions,
  ): Promise<Account> {
    return this.catalyst.request('POST', `/v1/accounts/${id}`, {
      params,
      options,
    })
  }
}
