import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export interface CareTeamRole {
  /**
   * Always `care_team_role`.
   */
  object: 'care_team_role'
  /**
   * Unique ID of the care team role
   */
  id: string
  /**
   * Public display name for this care team role
   */
  name: string
  /**
   * Timestamp when the role was created
   */
  created_at: string
  /**
   * Timestamp when the role was updated
   */
  updated_at: string
}

export interface CareTeamRoleListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<CareTeamRole>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface CareTeamRoleListParams {
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
}

export interface CareTeamRoleCreateParams {
  /**
   * Public display name for this care team role
   */
  name: string
}

export interface CareTeamRoleUpdateParams {
  /**
   * Public display name for this care team role
   */
  name?: string
}

export class CareTeamRoleResource extends Resource {
  /**
   * Returns a list of care team roles within the current account.
   *
   * The roles returned are sorted by creation date, sorted alphabetically by name.
   */
  public list(
    params?: CareTeamRoleListParams,
    options?: SourceRequestOptions,
  ): Promise<CareTeamRoleListResponse> {
    return this.source.request('GET', '/v1/care_team_roles', {
      query: params,
      options,
    })
  }

  /**
   * Creates a care team role, which will describe the purpose of each participant on
   * a member's care team. You can use care team roles to control how tasks are
   * routed among the care team.
   */
  public create(
    params: CareTeamRoleCreateParams,
    options?: SourceRequestOptions,
  ): Promise<CareTeamRole> {
    return this.source.request('POST', '/v1/care_team_roles', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing care team role. You need only supply the
   * unique care team role identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<CareTeamRole> {
    return this.source.request('GET', `/v1/care_team_roles/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified care team role by setting the values of the parameters
   * passed.
   *
   * Any parameters not provided will be left unchanged.
   */
  public update(
    id: string,
    params?: CareTeamRoleUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<CareTeamRole> {
    return this.source.request('POST', `/v1/care_team_roles/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
