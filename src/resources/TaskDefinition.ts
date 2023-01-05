import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Queue } from './Queue'
import { Expandable } from './shared'

export interface TaskDefinition {
  /**
   * Always `task_definition`.
   */
  object: 'task_definition'
  /**
   * Unique ID for the task definition.
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
   * The queue through which tasks should be routed. This queue will be applied by
   * default. However, you can override the queue for a given task during task
   * creation.
   */
  queue: Expandable<Queue> | null
  /**
   * The user license(s) that are required to perform tasks of this type. Automatic
   * task routing by Source respects licensing. If more than one license code is
   * provided, a licensed user with any of the license codes can perform this task.
   * Providing any value will override the entire array. Providing null or an empty
   * array will empty out the array.
   */
  license_types: Array<TaskDefinitionLicenseType>
  /**
   * Whether or not tasks are managed automatically by Source. Only Source can create
   * tasks with managed task definitions, and those tasks may only be resolved by
   * Source.
   */
  managed: boolean
  /**
   * Timestamp of when the task definition was created.
   */
  created_at: string
  /**
   * Timestamp of when the task definition was last updated.
   */
  updated_at: string
}

export interface TaskDefinitionLicenseType {
  /**
   * Code for the license type. For example, "MD".
   */
  code: string
  /**
   * Description of the license type. For example, "Doctor of Medcine".
   */
  description: string
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
  /**
   * Sort field for the results. A '-' prefix indicates sorting by that field in
   * descending order, otherwise the order will be ascending.
   */
  sort?: TaskDefinitionListParamsSort
  /**
   * Limit results to task definitions with name containing the given query.
   */
  name?: string
  /**
   * Filter results by queue. If multiple queues are provided, task definitions
   * related to any of those queues will be returned.
   */
  queue?: Array<string>
}

export type TaskDefinitionListParamsSort = 'created_at' | 'name' | '-created_at' | '-name'

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
   * The ID of the queue to which tasks should be assigned. You may provide a queue
   * when creating tasks definitions, and may also override it when creating a
   * specific task.
   */
  queue?: string | null
  /**
   * The user license(s) that are required to perform tasks of this type. Automatic
   * task routing by Source respects licensing. If more than one license code is
   * provided, a licensed user with any of the license codes can perform this task.
   * Providing any value will override the entire array. Providing null or an empty
   * array will empty out the array.
   */
  license_types?: Array<TaskDefinitionCreateParamsLicenseType> | null
}

export interface TaskDefinitionCreateParamsLicenseType {
  code: string
}

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
   * The ID of the queue to which tasks should be assigned. You may provide a queue
   * when creating tasks definitions, and may also override it when creating a
   * specific task.
   */
  queue?: string | null
  /**
   * The user license(s) that are required to perform tasks of this type. Automatic
   * task routing by Source respects licensing. If more than one license code is
   * provided, a licensed user with any of the license codes can perform this task.
   * Providing any value will override the entire array. Providing null or an empty
   * array will empty out the array.
   */
  license_types?: Array<TaskDefinitionUpdateParamsLicenseType> | null
}

export interface TaskDefinitionUpdateParamsLicenseType {
  code: string
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
