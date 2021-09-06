import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface User {
  
  /**
   * Always `user`.
   */
  readonly object: string
  
  /**
   * Unique ID for this user.
   */
  readonly id: string
  
  /**
   * First name of the user.
   */
  readonly first_name: string
  
  /**
   * Last name of the user.
   */
  readonly last_name: string
  
  /**
   * Email address for the user.
   */
  readonly email: string
  
  /**
   * Role the user is granted in your account.
   */
  readonly role: string
  
  /**
   * Timestamp when the user was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp when the user was last updated.
   */
  readonly updated_at: string
  
  /**
   * Timestamp when the user was last deactivated, if they have been deactivated.
   */
  readonly deactivated_at: string
}

interface ListAllUsersParams {
  
  /**
   * A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if
   * you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  readonly ending_before?: string
  
  /**
   * A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if
   * you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  readonly starting_after?: string
  
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100.
   */
  readonly limit?: number
  
  /**
   * Limit results to users with email matching the given query.
   */
  readonly email?: string
  
  /**
   * Limit results to users with name matching the given query.
   */
  readonly name?: string
  
  /**
   * Filter results by role. If multiple roles are provided, users matching any of those roles will be returned.
   */
  readonly role?: Array<string>
  
  /**
   * If set to 'true', this will also include deactivated users. If unset or `false`, deactivated users are not returned in
   * the list.
   */
  readonly include_deactivated?: boolean
}

interface ListAllUsersResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<User>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}


export class UserContext extends BaseContext {
  
  /**
   * Retrieve a user by their unique identifier.
   *
   * @param id Unique ID of the user
   * @param options Options to apply to this specific request
   */
  public async find(id: string, options?: CatalystOptions): Promise<User> {
    return this.catalyst.request("GET", `/v1/users/${id}`, { 
      options,
    })
  }
  
  /**
   * Returns a list of users within the current account.
   * 
   * The users returned are sorted by creation date, with the most recently added users appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllUsersParams, options?: CatalystOptions): Promise<ListAllUsersResponse> {
    return this.catalyst.request("GET", `/v1/users`, { 
      params,
      options,
    })
  }
  
}