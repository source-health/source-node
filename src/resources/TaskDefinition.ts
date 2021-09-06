import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface TaskDefinition {
  
  /**
   * Always `task_definition`.
   */
  readonly object: string
  
  /**
   * Unique ID of the task definition.
   */
  readonly id: string
  
  /**
   * Unique identifier for the task definition that can be used when creating tasks.
   */
  readonly key: string
  
  /**
   * Human readable name of the task definition.
   */
  readonly name: string
  
  /**
   * Timestamp of when the task definition was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp of when the task definition was last updated.
   */
  readonly updated_at: string
}

interface ListAllTaskDefinitionsParams {
  
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
}

interface ListAllTaskDefinitionsResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<TaskDefinition>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateATaskDefinitionParams {
  
  /**
   * Globally unique identifier of the task definition
   */
  readonly key: string
  
  /**
   * Human readable name of the task definition
   */
  readonly name: string
}

interface UpdateATaskDefinitionParams {
  
  /**
   * Globally unique identifier of the task definition
   */
  readonly key?: string
  
  /**
   * Human readable name of the task definition
   */
  readonly name?: string
}


export class TaskDefinitionContext extends BaseContext {
  
  /**
   * Returns a list of task definitions within the current account.
   * 
   * The task definitions returned are sorted by creation date, with the most recently added task definitions appearing
   * first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllTaskDefinitionsParams, options?: CatalystOptions): Promise<ListAllTaskDefinitionsResponse> {
    return this.catalyst.request("GET", `/v1/task_definitions`, { 
      params,
      options,
    })
  }
  
  /**
   * Creates a new task definition and registers it with Catalyst. Task defiitions must be created in order to create tasks
   * of that type
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateATaskDefinitionParams, options?: CatalystOptions): Promise<TaskDefinition> {
    return this.catalyst.request("POST", `/v1/task_definitions`, { 
      params,
      options,
    })
  }
  
  /**
   * Retrieves the details of an existing task definition. You need only supply the unique task definition identifier that
   * was returned upon creation.
   *
   * @param id Unique ID of the task_definition
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<TaskDefinition> {
    return this.catalyst.request("GET", `/v1/task_definitions/${id}`, { 
      options,
    })
  }
  
  /**
   * Updates the specified task definition by setting the values of the parameters passed.
   * 
   * Any parameters not provided will be left unchanged. For example, if you pass the name parameter, that becomes the task
   * definitions's active name that is used in the API and interface.
   *
   * @param id Unique ID of the task_definition
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async update(id: string, params?: UpdateATaskDefinitionParams, options?: CatalystOptions): Promise<TaskDefinition> {
    return this.catalyst.request("POST", `/v1/task_definitions/${id}`, { 
      params,
      options,
    })
  }
  
}