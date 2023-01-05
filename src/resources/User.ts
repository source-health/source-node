import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { File } from './File'
import { Group } from './Group'
import { Expandable } from './shared'

export interface User {
  /**
   * Always `user`.
   */
  object: 'user'
  /**
   * Unique ID for the user.
   */
  id: string
  /**
   * Title of this user.
   */
  title: string | null
  /**
   * First name of the user.
   */
  first_name: string | null
  /**
   * Last name of the user.
   */
  last_name: string | null
  /**
   * Suffix for this user.
   */
  suffix: string | null
  /**
   * Display text that describes the user's title. The display title will appear in
   * the Source application and the member experience SDKs but will not affect any
   * Source configuration. For example, a physician user's title may be set to
   * 'Physician.'
   */
  display_title: string | null
  /**
   * Email address for the user.
   */
  email: string
  /**
   * Role the user is granted in your account.
   */
  role: UserRole
  /**
   * The time zone identifier for this user. User time zones are used when checking
   * their availability schedules, and may also be used when formatting times outside
   * of the context of a browser (such as an email).
   */
  time_zone: string
  /**
   * Whether or not the user is a licensed clinician. By default, this is set to
   * false. If set to true, note that the user should have licenses configured to be
   * able to perform workflows that require licensure. For example, licensure may be
   * required to receive certain tasks and appointments.
   */
  licensed: boolean
  /**
   * The groups for this user, which must reference groups that exist in your
   * account. A user can be a member of up to 20 groups.
   */
  groups: Array<Expandable<Group>>
  /**
   * Current status of the user. Possible status values are `active`, `invited`, and
   * `deactivated`.
   */
  status: UserStatus
  /**
   * The file for the user's profile image.
   */
  profile_image: Expandable<File> | null
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

export type UserRole = 'owner' | 'administrator' | 'developer' | 'clinician' | 'support'
export type UserStatus = 'active' | 'deactivated' | 'invited'

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
   * Sort field for the results. A '-' prefix indicates sorting by that field in
   * descending order, otherwise the order will be ascending.
   */
  sort?: UserListParamsSort
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
   * Filter results by group. If multiple groups are provided, users matching any of
   * those groups will be returned.
   */
  groups?: Array<string>
  /**
   * If set to 'true', this will also include deactivated users. If unset or `false`,
   * deactivated users are not returned in the list.
   */
  include_deactivated?: boolean
}

export type UserListParamsSort = 'last_name' | 'created_at' | '-last_name' | '-created_at'

export interface UserCreateParams {
  /**
   * Title of this user.
   */
  title?: string | null
  /**
   * First name of the user.
   */
  first_name: string
  /**
   * Last name of the user.
   */
  last_name: string
  /**
   * Suffix for this user.
   */
  suffix?: string | null
  /**
   * Display text that describes the user's title. The display title will appear in
   * the Source application and the member-facing Elements SDK but will not affect
   * any Source configuration. For example, a physician user's title may be set to
   * 'Physician.'
   */
  display_title?: string | null
  /**
   * Email address for the user. Only admins and owners may update another user's
   * email address, this cannot be updated using API keys.
   */
  email: string
  /**
   * Password for the user. This field can only be set when creating the root user
   * for an account.
   */
  password?: string
  /**
   * Role the user is granted in your account. Only admins and owners may manage
   * another user's role, this cannot be updated using API keys.
   */
  role: UserCreateParamsRole
  /**
   * The time zone identifier for this user. User time zones are used when checking
   * their availability schedules, and may also be used when formatting times outside
   * of the context of a browser (such as an email).
   */
  time_zone?: string
  /**
   * Whether or not the user is a licensed clinician. By default, this is set to
   * false. If set to true, note that the user should have licenses configured to be
   * able to perform workflows that require licensure. For example, licensure may be
   * required to receive certain tasks and appointments.
   */
  licensed?: boolean
  /**
   * The groups for this user, which must reference groups that exists in your
   * account. A user can be a member of  up to 20 groups.
   */
  groups?: Array<string>
  /**
   * The file for the user's profile image. Must be of type `user_profile_photo`
   */
  profile_image?: string | null
}

export type UserCreateParamsRole = 'owner' | 'administrator' | 'developer' | 'clinician' | 'support'

export interface UserUpdateParams {
  /**
   * Title of this user.
   */
  title?: string | null
  /**
   * First name of the user.
   */
  first_name?: string
  /**
   * Last name of the user.
   */
  last_name?: string
  /**
   * Suffix for this user.
   */
  suffix?: string | null
  /**
   * Display text that describes the user's title. The display title will appear in
   * the Source application and the member-facing Elements SDK but will not affect
   * any Source configuration. For example, a physician user's title may be set to
   * 'Physician.'
   */
  display_title?: string | null
  /**
   * Email address for the user. Only admins and owners may update another user's
   * email address, this cannot be updated using API keys.
   */
  email?: string
  /**
   * Role the user is granted in your account. Only admins and owners may manage
   * another user's role, this cannot be updated using API keys.
   */
  role?: UserUpdateParamsRole
  /**
   * The time zone identifier for this user. User time zones are used when checking
   * their availability schedules, and may also be used when formatting times outside
   * of the context of a browser (such as an email).
   */
  time_zone?: string
  /**
   * Whether or not the user is a licensed clinician. By default, this is set to
   * false. If set to true, note that the user should have licenses configured to be
   * able to perform workflows that require licensure. For example, licensure may be
   * required to receive certain tasks and appointments.
   */
  licensed?: boolean
  /**
   * The groups for this user, which must reference groups that exists in your
   * account. A user can be a member of  up to 20 groups.
   */
  groups?: Array<string>
  /**
   * The file for the user's profile image. Must be of type `user_profile_photo`
   */
  profile_image?: string | null
}

export type UserUpdateParamsRole = 'owner' | 'administrator' | 'developer' | 'clinician' | 'support'

export class UserResource extends Resource {
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

  /**
   * Creates a new user on the Source platform.
   *
   * The user will be sent an email inviting them to finish creating their account.
   * User accounts will not be active until they have followed the link in the
   * invitation email and set a password.
   *
   * Administrators and owners can create users.
   *
   * API keys can create users but cannot create with role 'developer',
   * 'administrator', or 'owner' or assign users to groups.
   *
   * Other user roles cannot create users.
   */
  public create(params: UserCreateParams, options?: SourceRequestOptions): Promise<User> {
    return this.source.request('POST', '/v1/users', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieve a user by their unique identifier.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<User> {
    return this.source.request('GET', `/v1/users/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified user by setting the values of the parameters passed. Any
   * parameters not provided will be left unchanged. For example, if you only provide
   * the first_name parameter, that only updates the user's first_name.
   *
   * All users can update their own name.
   *
   * API keys can update the name of users.
   *
   * Administrators and owners may update the name, email and role of other users.
   *
   * Administrators and owners may assign users to groups.
   *
   * Administrators and owners are not permitted to change their own role.
   */
  public update(
    id: string,
    params?: UserUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<User> {
    return this.source.request('POST', `/v1/users/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
