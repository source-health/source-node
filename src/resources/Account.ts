import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'

/* eslint-disable @typescript-eslint/no-namespace */

export interface Account {
  readonly id: string
  readonly name: string
  readonly subdomain: string
  readonly created_at: Date
  readonly updated_at: Date
}

interface CreateAccountParams {
  name: string
  subdomain: string
}

interface UpdateAccountParams {
  name?: string
  subdomain?: string
}

interface Member {
  id: string
  address: Member.Address
}

namespace Member {
  export interface Address {
    line1: string
  }
}

export class AccountContext extends BaseContext {
  /**
   * Something about this prop
   */
  public update(
    id: string,
    params: UpdateAccountParams,
    options?: CatalystOptions,
  ): Promise<Account> {
    return this.catalyst.request('POST', `/v1/accounts/${id}`, {
      params,
      options,
    })
  }

  public get(id: string, options?: CatalystOptions): Promise<Account> {
    return this.catalyst.request('GET', `/v1/accounts/${id}`, {
      options,
    })
  }
}
