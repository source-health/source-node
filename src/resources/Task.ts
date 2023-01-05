import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Member } from './Member'
import { Queue } from './Queue'
import { TaskDefinition } from './TaskDefinition'
import { User } from './User'
import { Encounter } from './clinical/Encounter'
import { Thread } from './communications/Thread'
import { Expandable } from './shared'

export interface Task {
  /**
   * Always `task`.
   */
  object: 'task'
  /**
   * Unique ID for the task.
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
   * The user to which this task is assigned. If set to null, the task is unassigned.
   */
  assignee: Expandable<User> | null
  /**
   * The queue to which a task is assigned. When creating a task, if no queue is
   * specified for the task, the task will use the queue of the task definition. If
   * no queue exists on the task definition, the task will not be placed in a queue.
   */
  queue: Expandable<Queue> | null
  /**
   * A human-readable string that describes the task at a high level. For system
   * created tasks this field will be populated by the system.
   */
  summary: string
  /**
   * Long-form text describing the task to be performed. You can use this field to
   * share any additional relevant context to the care team that will be acting on
   * this task.
   */
  description: string | null
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
   * Whether or not the task is managed automatically by Source. If a task is
   * managed, only Source can resolve or create the task. You can still update other
   * properties of the task."
   */
  managed: boolean
  /**
   * The number of comments that have been made on this task.
   */
  comments: number
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
  /**
   * A list of related resources, such as open threads. The resource can be expanded
   * with e.g. '&expand=related.resource'.
   */
  related: Array<TaskRelated>
}

export type TaskStatus = 'open' | 'in_progress' | 'blocked' | 'on_hold' | 'resolved' | 'canceled'
export type TaskAssignmentMethod = 'direct' | 'indirect'

export interface TaskRelated {
  /**
   * Related object type
   */
  resource_type: TaskRelatedResourceType
  /**
   * Unique identifier for the related resource.
   */
  resource: Expandable<Thread | Encounter>
}

export type TaskRelatedResourceType = 'thread' | 'encounter'

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
   * Sort field for the results. A '-' prefix indicates sorting by that field in
   * descending order, otherwise the order will be ascending.
   */
  sort?: TaskListParamsSort
  /**
   * Filter results by status. If multiple statuses are provided, tasks matching any
   * of the provided statuses will be returned.
   */
  status?: Array<TaskListParamsStatus>
  /**
   * Filter results by member. If multiple member ids are provided, tasks matching
   * any of the provided members will be returned.
   */
  member?: Array<string>
  /**
   * Filter results by assignees. If multiple assignee ids are provided, tasks
   * matching any of the provided assignees will be returned. Providing `unassigned`
   * will return any tasks that are unassigned.
   */
  assignee?: Array<string>
  /**
   * Filter results by task definitons. If multiple task definition ids are provided,
   * tasks matching any of the provided definitions will be returned.
   */
  definition?: Array<string>
  /**
   * Filter results by queue. If multiple queues are provided, task related to any of
   * those queues will be returned.
   */
  queue?: Array<string>
  /**
   * A time based range filter on the list based on the object due_at field. For
   * example
   * `?due_at[gt]=2021-05-10T16:51:38.075Z&due_at[lte]=2021-05-26T16:51:38.075Z`. The
   * value is a dictionary with the following:
   */
  due_at?: TaskListParamsDueAt
  /**
   * A time based range filter on the list based on the object created_at field. For
   * example
   * `?created_at[gt]=2021-05-10T16:51:38.075Z&created_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  created_at?: TaskListParamsCreatedAt
}

export type TaskListParamsSort = 'created_at' | 'due_at' | '-created_at' | '-due_at'
export type TaskListParamsStatus =
  | 'open'
  | 'in_progress'
  | 'blocked'
  | 'on_hold'
  | 'resolved'
  | 'canceled'

export interface TaskListParamsDueAt {
  /**
   * Return results where the due_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the due_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the due_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the due_at field is greater than or equal to this value.
   */
  gte?: string
}

export interface TaskListParamsCreatedAt {
  /**
   * Return results where the created_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the created_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the created_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the created_at field is greater than or equal to this
   * value.
   */
  gte?: string
}

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
   * The user to which this task is assigned. If set to null, the task will be
   * unassigned.
   */
  assignee?: string | null
  /**
   * The ID of the queue to which a task is assigned. When creating a task, if no
   * queue is specified for the task, the task will use the queue of the task
   * definition. If no queue exists on the task definition, the task will not be
   * placed in a queue.
   */
  queue?: string | null
  /**
   * A brief summary of the task, which will be shown wherever the task is presented.
   */
  summary: string
  /**
   * Long-form text describing the task to be performed. You can use this field to
   * share any additional relevant context to the care team that will be acting on
   * this task.
   */
  description?: string | null
  /**
   * The status of the task
   */
  status: TaskCreateParamsStatus
  /**
   * The time by which this task should be completed. If no due_at date is supplied,
   * the due_at date will automatically be 24 hours after the task was created.'
   */
  due_at?: string
  /**
   * A list of object IDs, such as threads, that are related to the task.
   */
  related?: Array<string>
}

export type TaskCreateParamsStatus =
  | 'open'
  | 'in_progress'
  | 'blocked'
  | 'on_hold'
  | 'resolved'
  | 'canceled'

export interface TaskUpdateParams {
  /**
   * The user to which this task is assigned. If set to null, the task will be
   * unassigned.
   */
  assignee?: string | null
  /**
   * The ID of the queue to which a task is assigned. When creating a task, if no
   * queue is specified for the task, the task will use the queue of the task
   * definition. If no queue exists on the task definition, the task will not be
   * placed in a queue.
   */
  queue?: string | null
  /**
   * A brief summary of the task, which will be shown wherever the task is presented.
   */
  summary?: string
  /**
   * Long-form text describing the task to be performed. You can use this field to
   * share any additional relevant context to the care team that will be acting on
   * this task.
   */
  description?: string | null
  /**
   * The status of the task
   */
  status?: TaskUpdateParamsStatus
  /**
   * The time by which this task should be completed. If no due_at date is supplied,
   * the due_at date will automatically be 24 hours after the task was created.'
   */
  due_at?: string
  /**
   * A list of object IDs, such as threads, that are related to the task.
   */
  related?: Array<string>
}

export type TaskUpdateParamsStatus =
  | 'open'
  | 'in_progress'
  | 'blocked'
  | 'on_hold'
  | 'resolved'
  | 'canceled'

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
   * cannot update the definition or member associated with that task. Note that you
   * cannot create a task using system-managed task definitions (those with keys
   * starting with system).
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
   * assignee parameter, that assigns the task to the given user. Note that you
   * cannot resolve system-managed tasks (those with `managed` set to `true`).
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
