import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { Task } from '../Task'
import { FormResponse } from '../forms/FormResponse'
import { Appointment } from '../scheduling/Appointment'
import { Expandable } from '../shared'

import { EncounterType } from './EncounterType'

export interface Encounter {
  /**
   * Always `encounter`.
   */
  object: 'encounter'
  /**
   * Unique ID for the encounter.
   */
  id: string
  /**
   * The type of encounter that was created.
   */
  encounter_type: Expandable<EncounterType>
  /**
   * Member to which the encounter belongs.
   */
  member: Expandable<Member>
  /**
   * Whether or not the encounter is open and requires follow-up or further
   * documentation. Any note associated with an encounter must be signed before the
   * encounter can be closed.
   */
  status: EncounterStatus
  /**
   * Timestamp of when the encounter started.
   */
  start_at: string
  /**
   * Timestamp of when the encounter ended.
   */
  end_at: string | null
  /**
   * Array of resources related to the encounter, such as appointments and form
   * responses. When retrieving encounters via API, related resources can be expanded
   * by including `&expand=related.resource` in the encounter query.
   */
  related: Array<EncounterRelated>
  /**
   * The identifier of the task associated with the encounter. Open encounters
   * automatically generate tasks to ensure that the encounter is documented and
   * closed. For convenience, you can optionally specify a task assignee when
   * creating or updating an encounter using the `assignee` parameter. When the
   * encounter is closed, the associated task is automatically resolved and unlinked
   * from the encounter. If the encounter is reopened, a new task is created and will
   * follow task routing configuration unless you specify an assignee.
   */
  task: Expandable<Task> | null
  /**
   * Timestamp of when the encounter was created.
   */
  created_at: string
  /**
   * Timestamp of when the encounter was last updated.
   */
  updated_at: string
  /**
   * Timestamp of when the encounter was deleted.
   */
  deleted_at: string | null
}

export type EncounterStatus = 'open' | 'closed'

export interface EncounterRelated {
  /**
   * Type of related resource.
   */
  resource_type: EncounterRelatedResourceType
  /**
   * Unique identifier for the related resource.
   */
  resource: Expandable<Appointment | FormResponse>
}

export type EncounterRelatedResourceType = 'appointment' | 'form_response'

export interface EncounterListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Encounter>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface EncounterListParams {
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
  sort?: EncounterListParamsSort
  /**
   * Filter results by encounter type. If multiple encounter type ids are provided,
   * encounters matching any of the provided encounter types will be returned.
   */
  encounter_type?: Array<string>
  /**
   * Filter results by member. If multiple member ids are provided, encounters
   * matching any of the provided members will be returned.
   */
  member?: Array<string>
  /**
   * Filter results by status.
   */
  status?: Array<EncounterListParamsStatus>
  /**
   * Filter results by related resources.
   */
  related?: Array<EncounterListParamsRelated>
  /**
   * A time based range filter on the list based on the object start_at field. For
   * example
   * `?start_at[gt]=2021-05-10T16:51:38.075Z&start_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  start_at?: EncounterListParamsStartAt
  /**
   * When set to true, deleted encounters are included.
   */
  include_deleted?: boolean
}

export type EncounterListParamsSort = 'created_at' | '-created_at'
export type EncounterListParamsStatus = 'open' | 'closed'
export type EncounterListParamsRelated = string

export interface EncounterListParamsStartAt {
  /**
   * Return results where the start_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the start_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the start_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the start_at field is greater than or equal to this value.
   */
  gte?: string
}

export interface EncounterCreateParams {
  /**
   * The encounter type to use for this encounter.
   */
  encounter_type: string
  /**
   * The member to which this encounter belongs.
   */
  member: string
  /**
   * Whether or not the encounter is open and requires follow-up or further
   * documentation. Any note associated with an encounter must be signed before the
   * encounter can be closed.
   */
  status?: EncounterCreateParamsStatus
  /**
   * Timestamp of when the encounter started.
   */
  start_at?: string
  /**
   * Timestamp of when the encounter ended.
   */
  end_at?: string
  /**
   * List of unique identifiers of resources related to the encounter, such as
   * appointments and form responses. Providing related resources input replaces any
   * existing related resources on the encounter. Providing null or an empty list
   * empties out the list of related resources.
   */
  related?: Array<EncounterCreateParamsRelated> | null
  /**
   * The user to which the task associated with the open encounter should be
   * assigned. If not specified, the task follows task routing configuration to
   * choose an assignee. When creating or updating an open encounter, you can use
   * this parameter for convenience to route the encounter task to a specific
   * assignee. The task itself can also be updated directly using the Task API.
   */
  assignee?: string | null
}

export type EncounterCreateParamsStatus = 'open' | 'closed'
export type EncounterCreateParamsRelated = string

export interface EncounterUpdateParams {
  /**
   * Whether or not the encounter is open and requires follow-up or further
   * documentation. Any note associated with an encounter must be signed before the
   * encounter can be closed.
   */
  status?: EncounterUpdateParamsStatus
  /**
   * Timestamp of when the encounter started.
   */
  start_at?: string
  /**
   * Timestamp of when the encounter ended.
   */
  end_at?: string
  /**
   * List of unique identifiers of resources related to the encounter, such as
   * appointments and form responses. Providing related resources input replaces any
   * existing related resources on the encounter. Providing null or an empty list
   * empties out the list of related resources.
   */
  related?: Array<EncounterUpdateParamsRelated> | null
  /**
   * The user to which the task associated with the open encounter should be
   * assigned. If not specified, the task follows task routing configuration to
   * choose an assignee. When creating or updating an open encounter, you can use
   * this parameter for convenience to route the encounter task to a specific
   * assignee. The task itself can also be updated directly using the Task API.
   */
  assignee?: string | null
}

export type EncounterUpdateParamsStatus = 'open' | 'closed'
export type EncounterUpdateParamsRelated = string

export class EncounterResource extends Resource {
  /**
   * Returns a list of encounters within the current account.
   *
   * The encounters by default are sorted by creation date, with the most recently
   * created encounter appearing first.
   */
  public list(
    params?: EncounterListParams,
    options?: SourceRequestOptions,
  ): Promise<EncounterListResponse> {
    return this.source.request('GET', '/v1/encounters', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new encounter for the specified member. An encounter requires at least
   * a start timestamp and can optionally include resources related to the encounter.
   */
  public create(params: EncounterCreateParams, options?: SourceRequestOptions): Promise<Encounter> {
    return this.source.request('POST', '/v1/encounters', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing encounter. You need only supply the unique
   * encounter identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Encounter> {
    return this.source.request('GET', `/v1/encounters/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified encounter by setting the values of the parameters passed.
   * Any parameters not provided will be left unchanged.
   */
  public update(
    id: string,
    params?: EncounterUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Encounter> {
    return this.source.request('POST', `/v1/encounters/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes an encounter.
   *
   * Deleting an encounter is only possible when any associated notes are themselves
   * deleted. The associated encounter.deleted event will contain the array of
   * related resources for the encounter as it existed prior to deletion. When
   * retrieving deleted encounters, note that the array or related resources will be
   * empty.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Encounter> {
    return this.source.request('DELETE', `/v1/encounters/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
