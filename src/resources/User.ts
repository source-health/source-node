import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export type UserRole = 'owner' | 'administrator' | 'developer' | 'clinician' | 'support'

export interface User {
  /**
   * Always `user`.
   */
  object: 'user'
  /**
   * Unique ID for this user.
   */
  id: string
  /**
   * First name of the user.
   */
  first_name: string | null
  /**
   * Last name of the user.
   */
  last_name: string | null
  /**
   * Email address for the user.
   */
  email: string
  /**
   * Role the user is granted in your account.
   */
  role: UserRole
  /**
   * Timestamp when the user was created.
   */
  created_at: string
  /**
   * Timestamp when the user was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the user was last deactivated, if they have been deactivated.
   */
  deactivated_at: string | null
}

export interface UserListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<User>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface UserListParams {
  /**
   * A cursor for use in pagination. `ending_before` is an object ID that defines
   * your place in the list. For instance, if you make a list request and receive 100
   * objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  ending_before?: string
  /**
   * A cursor for use in pagination. `starting_after` is an object ID that defines
   * your place in the list. For instance, if you make a list request and receive 100
   * objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  starting_after?: string
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100.
   */
  limit?: number
  /**
   * Limit results to users with email matching the given query.
   */
  email?: string
  /**
   * Limit results to users with name matching the given query.
   */
  name?: string
  /**
   * Filter results by role. If multiple roles are provided, users matching any of
   * those roles will be returned.
   */
  role?: Array<string>
  /**
   * If set to 'true', this will also include deactivated users. If unset or `false`,
   * deactivated users are not returned in the list.
   */
  include_deactivated?: boolean
}

export class UserResource extends Resource {
  /**
   * Retrieve a user by their unique identifier.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<User> {
    return this.source.request('GET', `/v1/users/${id}`, {
      options,
    })
  }

  /**
   * Returns a list of users within the current account.
   *
   * The users returned are sorted by creation date, with the most recently added
   * users appearing first.
   */
  public list(params?: UserListParams, options?: SourceRequestOptions): Promise<UserListResponse> {
    return this.source.request('GET', '/v1/users', {
      query: params,
      options,
    })
  }
}
