import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Task {
  
  /**
   * Always `task`.
   */
  readonly object: string
  
  /**
   * Unique ID of the task
   */
  readonly id: string
  
  /**
   * The type of task that needs to be completed.
   */
  readonly definition: string
  
  /**
   * The member for which the task should be performed.
   */
  readonly member: string
  
  /**
   * User on the care team to which this task is assigned.
   */
  readonly assignee: string
  
  /**
   * A human-readable string that describes the task at a high level. For system created tasks this field will be populated
   * by the system.
   */
  readonly description: string
  
  /**
   * Status the task is currently in
   */
  readonly status: string
  
  /**
   * Timestamp of when the task was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp of when the task was last updated.
   */
  readonly updated_at: string
  
  /**
   * The time by which this task should be completed
   */
  readonly due_at: string
}

interface ListAllTasksParams {
  
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
   * Filter results by status. If multiple statuses are provided, tasks matching any of the provided statuses will be
   * returned.
   */
  readonly status?: Array<string>
}

interface ListAllTasksResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Task>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateATaskParams {
  
  /**
   * The task definition that this task models. You may provide either the definition ID or key.
   */
  readonly definition: string
  
  /**
   * The member to which this task belongs.
   */
  readonly member: string
  
  /**
   * The user to which this task is assigned.
   */
  readonly assignee: string
  
  /**
   * Short text that describes the work to be done.
   */
  readonly description: string
  
  /**
   * The status of the task
   */
  readonly status: string
  
  /**
   * The time by which this task should be completed. If no due_at date is supplied, the due_at date will automatically be 24
   * hours after the task was created. The due_at date must be in the future.'
   */
  readonly due_at?: string
}

interface UpdateATaskParams {
  
  /**
   * The user to which this task is assigned.
   */
  readonly assignee?: string
  
  /**
   * Short text that describes the work to be done.
   */
  readonly description?: string
  
  /**
   * The status of the task
   */
  readonly status?: string
  
  /**
   * The time by which this task should be completed. If no due_at date is supplied, the due_at date will automatically be 24
   * hours after the task was created. The due_at date must be in the future.'
   */
  readonly due_at?: string
}


export class TaskContext extends BaseContext {
  
  /**
   * Returns a list of tasks within the current account.
   * 
   * The tasks returned are sorted by creation date, with the most recently added task appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllTasksParams, options?: CatalystOptions): Promise<ListAllTasksResponse> {
    return this.catalyst.request("GET", `/v1/tasks`, { 
      params,
      options,
    })
  }
  
  /**
   * Creates a new task and registers it with Catalyst. Once a task is created you cannot update the definition or member
   * associated with that task.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateATaskParams, options?: CatalystOptions): Promise<Task> {
    return this.catalyst.request("POST", `/v1/tasks`, { 
      params,
      options,
    })
  }
  
  /**
   * Retrieves the details of an existing task. You need only supply the unique task identifier that was returned upon
   * creation.
   *
   * @param id Unique ID of the task
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Task> {
    return this.catalyst.request("GET", `/v1/tasks/${id}`, { 
      options,
    })
  }
  
  /**
   * Updates the specified task by setting the values of the parameters passed.
   * 
   * Any parameters not provided will be left unchanged. For example, if you pass the assignee parameter, that assigns the
   * task to the given user.
   *
   * @param id Unique ID of the task
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async update(id: string, params?: UpdateATaskParams, options?: CatalystOptions): Promise<Task> {
    return this.catalyst.request("POST", `/v1/tasks/${id}`, { 
      params,
      options,
    })
  }
  
}