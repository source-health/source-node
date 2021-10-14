import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Member } from './Member'
import { TaskDefinition } from './TaskDefinition'
import { User } from './User'
import { Expandable } from './shared'

export type TaskStatus = 'open' | 'resolved'
export type TaskAssignmentMethod = 'direct' | 'indirect'

export interface Task {
  /**
   * Always `task`.
   */
  object: 'task'
  /**
   * Unique ID of the task.
   */
  id: string
  /**
   * The type of task that needs to be completed.
   */
  definition: Expandable<TaskDefinition>
  /**
   * The member for which the task should be performed.
   */
  member: Expandable<Member>
  /**
   * User on the care team to which this task is assigned.
   */
  assignee: Expandable<User> | null
  /**
   * A human-readable string that describes the task at a high level. For system
   * created tasks this field will be populated by the system.
   */
  description: string
  /**
   * Status the task is currently in
   */
  status: TaskStatus
  /**
   * This property allows you to see how the task was assigned. When we automatically
   * assign tasks based on your pre-defined routing rules, the value of this property
   * will be `indirect`. When an assignee is specified through the API or by a user
   * in the interface, the value of this property will be `direct`.
   */
  assignment_method: TaskAssignmentMethod
  /**
   * Timestamp of when the task was created.
   */
  created_at: string
  /**
   * Timestamp of when the task was last updated.
   */
  updated_at: string
  /**
   * The time by which this task should be completed
   */
  due_at: string
}

export interface TaskListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Task>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export type TaskListParamsStatus = 'open' | 'resolved'

export interface TaskListParams {
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
   * Filter results by status. If multiple statuses are provided, tasks matching any
   * of the provided statuses will be returned.
   */
  status?: Array<TaskListParamsStatus>
}

export type TaskCreateParamsStatus = 'open' | 'resolved'

export interface TaskCreateParams {
  /**
   * The task definition that this task models. You may provide either the definition
   * ID or key.
   */
  definition: string
  /**
   * The member to which this task belongs.
   */
  member: string
  /**
   * The user to which this task is assigned.
   */
  assignee?: string
  /**
   * Short text that describes the work to be done.
   */
  description: string
  /**
   * The status of the task
   */
  status: TaskCreateParamsStatus
  /**
   * The time by which this task should be completed. If no due_at date is supplied,
   * the due_at date will automatically be 24 hours after the task was created. The
   * due_at date must be in the future.'
   */
  due_at?: string
}

export type TaskUpdateParamsStatus = 'open' | 'resolved'

export interface TaskUpdateParams {
  /**
   * The user to which this task is assigned.
   */
  assignee?: string
  /**
   * Short text that describes the work to be done.
   */
  description?: string
  /**
   * The status of the task
   */
  status?: TaskUpdateParamsStatus
  /**
   * The time by which this task should be completed. If no due_at date is supplied,
   * the due_at date will automatically be 24 hours after the task was created. The
   * due_at date must be in the future.'
   */
  due_at?: string
}

export class TaskResource extends Resource {
  /**
   * Returns a list of tasks within the current account.
   *
   * The tasks returned are sorted by creation date, with the most recently added
   * task appearing first.
   */
  public list(params?: TaskListParams, options?: SourceRequestOptions): Promise<TaskListResponse> {
    return this.source.request('GET', '/v1/tasks', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new task and registers it with Source. Once a task is created you
   * cannot update the definition or member associated with that task.
   */
  public create(params: TaskCreateParams, options?: SourceRequestOptions): Promise<Task> {
    return this.source.request('POST', '/v1/tasks', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing task. You need only supply the unique task
   * identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Task> {
    return this.source.request('GET', `/v1/tasks/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified task by setting the values of the parameters passed.
   *
   * Any parameters not provided will be left unchanged. For example, if you pass the
   * assignee parameter, that assigns the task to the given user.
   */
  public update(
    id: string,
    params?: TaskUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Task> {
    return this.source.request('POST', `/v1/tasks/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
