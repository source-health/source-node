import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export interface Group {
  /**
   * Always `group`.
   */
  object: 'group'
  /**
   * Unique ID for the group.
   */
  id: string
  /**
   * Public display name for this group. The name must be unique across all groups.
   */
  name: string
  /**
   * A description for this group.
   */
  description: string | null
  /**
   * Timestamp when the group was created.
   */
  created_at: string
  /**
   * Timestamp when the group was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the group was deleted, which is only present for deleted groups.
   * Deleted groups are not typically returned by the API, however they are returned
   * in `group.deleted` events and expanded references on other objects.
   */
  deleted_at?: string
}

export interface GroupListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Group>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface GroupListParams {
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
  sort?: GroupListParamsSort
  /**
   * Limit results to groups with name containing the given query.
   */
  name?: string
}

export type GroupListParamsSort = 'created_at' | 'name' | '-created_at' | '-name'

export interface GroupCreateParams {
  /**
   * Public display name for this group. The name must be unique across all groups.
   */
  name: string
  /**
   * A description for this group.
   */
  description?: string | null
}

export interface GroupUpdateParams {
  /**
   * Public display name for this group. The name must be unique across all groups.
   */
  name?: string
  /**
   * A description for this group.
   */
  description?: string | null
}

export class GroupResource extends Resource {
  /**
   * Returns a list of groups within the current account.
   *
   * The groups returned are sorted by creation date, with the most recently added
   * group appearing first.
   */
  public list(
    params?: GroupListParams,
    options?: SourceRequestOptions,
  ): Promise<GroupListResponse> {
    return this.source.request('GET', '/v1/groups', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new group, which describes a function of a user. You can use groups
   * alongside queues to control how tasks are routed among the care team.
   */
  public create(params: GroupCreateParams, options?: SourceRequestOptions): Promise<Group> {
    return this.source.request('POST', '/v1/groups', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing group. You need only supply the unique
   * group identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Group> {
    return this.source.request('GET', `/v1/groups/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified group by setting the values of the parameters passed.
   *
   * Any parameters not provided will be left unchanged.
   */
  public update(
    id: string,
    params?: GroupUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Group> {
    return this.source.request('POST', `/v1/groups/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified group. A deleted group is removed from all other objects
   * to which it relates.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Group> {
    return this.source.request('DELETE', `/v1/groups/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
