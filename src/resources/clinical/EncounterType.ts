import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Queue } from '../Queue'
import { Expandable } from '../shared'

export interface EncounterType {
  /**
   * Always `encounter_type`.
   */
  object: 'encounter_type'
  /**
   * Unique ID for the encounter type.
   */
  id: string
  /**
   * Unique key for this encounter type. You can use this when creating encounters
   * via the API. In order to avoid potential confusion when distinguishing between
   * encounter type IDs and keys, keys must not start with `entp_`.
   */
  key: string
  /**
   * Name of this encounter type.
   */
  name: string
  /**
   * Description of this encounter type. This description is not displayed and is
   * used to capture administrative notes about the encounter type.
   */
  description: string | null
  /**
   * Queue through which tasks related to encounters of this type should be routed in
   * order to find an assignee. This queue overrides any queue specified in the task
   * definition for open encounters. You can always change the queue for a given task
   * once that task has been created.
   */
  queue: Expandable<Queue> | null
  /**
   * Timestamp of when the encounter type was created.
   */
  created_at: string
  /**
   * Timestamp of when the encounter type was last updated.
   */
  updated_at: string
  /**
   * Timestamp of when the encounter type was archived.
   */
  archived_at: string | null
}

export interface EncounterTypeListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<EncounterType>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface EncounterTypeListParams {
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
  sort?: EncounterTypeListParamsSort
  /**
   * Filter results by queue. If multiple queue ids are provided, encounter types
   * matching any of the provided queues will be returned.
   */
  queue?: Array<string>
  /**
   * Filter encounter types to only those whose archive status matches the provided
   * value. By default, this operation return all encounter types. You may pass
   * `archived=true` to show archived encounter types, or `archived=false` to show
   * unarchived encounter types.
   */
  archived?: boolean
}

export type EncounterTypeListParamsSort = 'created_at' | '-created_at'

export interface EncounterTypeCreateParams {
  /**
   * Unique key for this encounter type. You can use this when creating encounters
   * via the API. In order to avoid potential confusion when distinguishing between
   * encounter type IDs and keys, keys must not start with `entp_`.
   */
  key: string
  /**
   * Name of this encounter type. When a task associated with an encounter is
   * created, the encounter type's name is used to populate the task summary.
   */
  name: string
  /**
   * Description of this encounter type. This description is not displayed and is
   * used to capture administrative notes about the encounter type.
   */
  description?: string | null
  /**
   * Queue through which tasks related to encounters of this type should be routed in
   * order to find an assignee. This queue overrides any queue specified in the task
   * definition for open encounters. You can always change the queue for a given task
   * once that task has been created.
   */
  queue?: string | null
}

export interface EncounterTypeUpdateParams {
  /**
   * Unique key for this encounter type. You can use this when creating encounters
   * via the API. In order to avoid potential confusion when distinguishing between
   * encounter type IDs and keys, keys must not start with `entp_`.
   */
  key?: string
  /**
   * Name of this encounter type. When a task associated with an encounter is
   * created, the encounter type's name is used to populate the task summary.
   */
  name?: string
  /**
   * Description of this encounter type. This description is not displayed and is
   * used to capture administrative notes about the encounter type.
   */
  description?: string | null
  /**
   * Queue through which tasks related to encounters of this type should be routed in
   * order to find an assignee. This queue overrides any queue specified in the task
   * definition for open encounters. You can always change the queue for a given task
   * once that task has been created.
   */
  queue?: string | null
}

export interface EncounterTypeArchiveParams {
  /**
   * The ID of the encounter type to use as a replacement for resources such as
   * appointment types and forms that reference the archived encounter type. If not
   * specified and the encounter type is related to an appointment type or a form,
   * archiving will fail.
   */
  replacement_encounter_type?: EncounterTypeArchiveParamsReplacementEncounterType
}

export type EncounterTypeArchiveParamsReplacementEncounterType = string

export class EncounterTypeResource extends Resource {
  /**
   * Returns a list of encounter types within the current account. The encounter
   * types returned are sorted by creation date, with the most recently added
   * encounter type appearing first.
   */
  public list(
    params?: EncounterTypeListParams,
    options?: SourceRequestOptions,
  ): Promise<EncounterTypeListResponse> {
    return this.source.request('GET', '/v1/encounter_types', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new encounter type in Source.
   *
   * After creating an encounter type, you can relate the encounter type to
   * appointment types and forms in order to begin creating encounters.
   */
  public create(
    params: EncounterTypeCreateParams,
    options?: SourceRequestOptions,
  ): Promise<EncounterType> {
    return this.source.request('POST', '/v1/encounter_types', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves an encounter type by its unique identifier.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<EncounterType> {
    return this.source.request('GET', `/v1/encounter_types/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified encounter type by setting the values of the parameters
   * passed. Any parameters not provided will be left unchanged.
   *
   * Encounters are linked to encounter types in Source, so some changes made to an
   * encounter type will be visible on past encounters. However, changes to fields
   * that influence encounter behavior, such as the queue, will apply only to new
   * tasks that are related to open encounters.
   */
  public update(
    id: string,
    params?: EncounterTypeUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<EncounterType> {
    return this.source.request('POST', `/v1/encounter_types/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Archives the specified encounter type. An archived encounter type can be viewed
   * on any encounter it relates to but cannot be used to create new encounters.
   */
  public archive(
    id: string,
    params?: EncounterTypeArchiveParams,
    options?: SourceRequestOptions,
  ): Promise<EncounterType> {
    return this.source.request('POST', `/v1/encounter_types/${id}/archive`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Unarchives the specified encounter type. Once unarchived, the encounter type can
   * be used to create new encounters.
   */
  public unarchive(id: string, options?: SourceRequestOptions): Promise<EncounterType> {
    return this.source.request('POST', `/v1/encounter_types/${id}/unarchive`, {
      contentType: 'json',
      options,
    })
  }
}
