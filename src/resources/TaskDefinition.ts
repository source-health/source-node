import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export type TaskDefinitionParticipantRole = 'clinician' | 'nurse' | 'dietician' | 'ob-gyn'

export interface TaskDefinition {
  /**
   * Always `task_definition`.
   */
  object: 'task_definition'
  /**
   * Unique ID of the task definition.
   */
  id: string
  /**
   * Unique identifier for the task definition that can be used when creating tasks.
   */
  key: string
  /**
   * Human readable name of the task definition.
   */
  name: string
  /**
   * The default care team role that tasks should be assigned to.
   */
  participant_role: TaskDefinitionParticipantRole
  /**
   * Timestamp of when the task definition was created.
   */
  created_at: string
  /**
   * Timestamp of when the task definition was last updated.
   */
  updated_at: string
}

export interface TaskDefinitionListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<TaskDefinition>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface TaskDefinitionListParams {
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

export type TaskDefinitionCreateParamsParticipantRole =
  | 'clinician'
  | 'nurse'
  | 'dietician'
  | 'ob-gyn'

export interface TaskDefinitionCreateParams {
  /**
   * Globally unique identifier of the task definition
   */
  key: string
  /**
   * Human readable name of the task definition
   */
  name: string
  /**
   * The default care team role that tasks should be assigned to.
   */
  participant_role: TaskDefinitionCreateParamsParticipantRole
}

export type TaskDefinitionUpdateParamsParticipantRole =
  | 'clinician'
  | 'nurse'
  | 'dietician'
  | 'ob-gyn'

export interface TaskDefinitionUpdateParams {
  /**
   * Globally unique identifier of the task definition
   */
  key?: string
  /**
   * Human readable name of the task definition
   */
  name?: string
  /**
   * The default care team role that tasks should be assigned to.
   */
  participant_role?: TaskDefinitionUpdateParamsParticipantRole
}

export class TaskDefinitionResource extends Resource {
  /**
   * Returns a list of task definitions within the current account.
   *
   * The task definitions returned are sorted by creation date, with the most
   * recently added task definitions appearing first.
   */
  public list(
    params?: TaskDefinitionListParams,
    options?: SourceRequestOptions,
  ): Promise<TaskDefinitionListResponse> {
    return this.source.request('GET', '/v1/task_definitions', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new task definition and registers it with Source. Task defiitions must
   * be created in order to create tasks of that type
   */
  public create(
    params: TaskDefinitionCreateParams,
    options?: SourceRequestOptions,
  ): Promise<TaskDefinition> {
    return this.source.request('POST', '/v1/task_definitions', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing task definition. You need only supply the
   * unique task definition identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<TaskDefinition> {
    return this.source.request('GET', `/v1/task_definitions/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified task definition by setting the values of the parameters
   * passed.
   *
   * Any parameters not provided will be left unchanged. For example, if you pass the
   * name parameter, that becomes the task definitions's active name that is used in
   * the API and interface.
   */
  public update(
    id: string,
    params?: TaskDefinitionUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<TaskDefinition> {
    return this.source.request('POST', `/v1/task_definitions/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
