import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { Task } from '../Task'
import { TaskDefinition } from '../TaskDefinition'
import { Expandable } from '../shared'

export interface CarePlan {
  /**
   * Always `care_plan`.
   */
  object: 'care_plan'
  /**
   * Unique ID for the care plan.
   */
  id: string
  /**
   * Member to whom this care plan relates.
   */
  member: Expandable<Member>
  /**
   * Name of this care plan. This name is visible to both members and users.
   */
  name: string
  /**
   * A long-form description of this care plan. This description is visible to
   * members and can be used to describe the purpose of the care plan in more detail.
   */
  description: string | null
  /**
   * Current status of this care plan. By default, care plans are created in an
   * `active` status. You can use the `paused` status to stop activities associated
   * with the care plan and prevent any updates to the care plan, with the
   * expectation that the care plan will be reactivated in the future. Care plans in
   * a `canceled` or `completed` status cannot be reactivated.
   */
  status: CarePlanStatus
  /**
   * Timestamp indicating the start of the care plan. By default, `start_at` is set
   * to the current time on care plan creation. You can optionally set start_at to a
   * time in the past, for example in order to backload a historical care plan.
   * `start_at` cannot be set to a time in the future.
   */
  start_at: string
  /**
   * Timestamp indicating the end of the care plan. When a care plan is completed or
   * canceled, the `end_at` time is automatically updated. You can optionally specify
   * `end_at` when creating a care plan in a canceled or completed status, in order
   * to reflect a time in the past, for example when backloading a historical care
   * plan. `end_at` must be a time at or after `start_at` and cannot be a time in the
   * future.
   */
  end_at: string | null
  /**
   * An ordered list of activities associated with this care plan. Activities
   * represent actions the system should take while the care plan remains active. An
   * activity can optionally be configured to start at a future time and to recur.
   * For example, you can configure an activity to create a particular type of task
   * every four weeks, starting one month after the care plan's start date.
   */
  activities: Array<CarePlanActivity>
  /**
   * Timestamp when the care plan was created.
   */
  created_at: string
  /**
   * Timestamp when the care plan was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the care plan was deleted.
   */
  deleted_at: string | null
}

export type CarePlanStatus = 'active' | 'paused' | 'completed' | 'canceled'

export interface CarePlanActivity {
  /**
   * The unique identifier of this activity.
   */
  id: string
  /**
   * Action to take when the activity is run. The action must specify an action type
   * and corresponding configuration matching the action type.
   */
  action: CarePlanActivityAction
  /**
   * When the activity should begin running. You can specify either an `absolute`
   * trigger type along with a specific date and time or a `relative` trigger type to
   * indicate a period of time after the start of the care plan. The relative trigger
   * type supports units of `day`, `week`, and `month`.
   */
  trigger: CarePlanActivityTrigger | null
  /**
   * Defines the activity’s recurrence. If not set, the activity is expected to run
   * once. If neither `count` nor `until` is set, the activity runs indefinitely.
   */
  recurrence: CarePlanActivityRecurrence | null
  /**
   * The IANA time zone for the recurrence and trigger time for the activity.
   * Timestamps associated with activities are represented in UTC time, however the
   * zone is stored and used to calculate run times for the activity.
   */
  time_zone: string
  /**
   * Timestamp when the activity should run next. By default, the activity runs on
   * creation if active. If a trigger or recurrence is configured, the next run's
   * timestamp is automatically calculated and shown in this field.
   */
  occurs_at: string | null
  /**
   * Timestamp when the activity last ran.
   */
  last_occurred_at: string | null
  /**
   * The identifier of the action last created by this activity. For example, if the
   * activity is configured to produce a task, this is the identifier of the task the
   * activity last created.
   */
  last_outcome: Expandable<Task> | null
  /**
   * Number of times this activity has occurred before now.
   */
  previous_occurrences: number
  /**
   * Timestamp when the activity was completed.
   */
  completed_at: string | null
  /**
   * Timestamp when the activity was created.
   */
  created_at: string
  /**
   * Timestamp when the activity was last updated.
   */
  updated_at: string
}

export interface CarePlanActivityAction0 {
  type: 'task'
  config: CarePlanActivityAction0Config
}

export interface CarePlanActivityAction0Config {
  /**
   * Expandable reference to a Task Definition
   */
  task_definition: Expandable<TaskDefinition>
  /**
   * A brief summary of the task.
   */
  summary: string
}

export type CarePlanActivityAction = CarePlanActivityAction0

export interface CarePlanActivityTrigger0 {
  /**
   * Type of time-based trigger to use for this activity. If set to `absolute`,
   * specify the timestamp in the date parameter when this activity should run. If
   * set to `relative`, specify in the `amount` and `unit` parameters the amount of
   * time to wait after creation for the activity to run.
   */
  type: 'absolute'
  /**
   * Timestamp at which to trigger the activity.
   */
  date: string
}

export interface CarePlanActivityTrigger1 {
  /**
   * Type of time-based trigger to use for this activity. If set to `absolute`,
   * specify the timestamp in the date parameter when this activity should run. If
   * set to `relative`, specify in the `amount` and `unit` parameters the amount of
   * time to wait after creation for the activity to run.
   */
  type: 'relative'
  /**
   * Units for the time specified in `amount`.
   */
  unit: CarePlanActivityTrigger1Unit
  /**
   * Together with the `unit` parameter, the amount of time to wait after activity
   * creation until triggering the activity.
   */
  amount: number
}

export type CarePlanActivityTrigger1Unit = 'day' | 'week' | 'month'
export type CarePlanActivityTrigger = CarePlanActivityTrigger0 | CarePlanActivityTrigger1

export interface CarePlanActivityRecurrence {
  /**
   * How often the activity should recur. Source only supports 'weekly' at this time
   * (including "every N weeks", using `interval`).
   */
  frequency: 'weekly'
  /**
   * How many of the `frequency` intervals between each activity execution, i.e.
   * 'every N weeks'.
   */
  interval: number
  /**
   * How many total times the activity should execute.
   *
   * Only one of `count` or `until` can be set.
   */
  count?: number
  /**
   * The date at which the recurring activity ends. This date is inclusive, so if an
   * activity execution falls on this date, it will run. Only one of `count` or
   * `until` can be set.
   */
  until?: string
  /**
   * The days of the week on which the activity should occur. By providing multiple
   * days, you can indicate multiple recurring activities per week.
   */
  days_of_week: Array<CarePlanActivityRecurrenceDaysOfWeek>
}

export type CarePlanActivityRecurrenceDaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface CarePlanListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<CarePlan>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface CarePlanListParams {
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
  sort?: CarePlanListParamsSort
  /**
   * Filter results by member.
   */
  member?: string
  /**
   * Filter results by status. If multiple statuses are provided, care plans matching
   * any of the provided statuses will be returned.
   */
  status?: Array<CarePlanListParamsStatus>
  /**
   * A time based range filter on the list based on the object start_at field. For
   * example
   * `?start_at[gt]=2021-05-10T16:51:38.075Z&start_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  start_at?: CarePlanListParamsStartAt
  /**
   * A time based range filter on the list based on the object end_at field. For
   * example
   * `?end_at[gt]=2021-05-10T16:51:38.075Z&end_at[lte]=2021-05-26T16:51:38.075Z`. The
   * value is a dictionary with the following:
   */
  end_at?: CarePlanListParamsEndAt
}

export type CarePlanListParamsSort =
  | 'created_at'
  | 'start_at'
  | 'end_at'
  | '-created_at'
  | '-start_at'
  | '-end_at'
export type CarePlanListParamsStatus = 'active' | 'paused' | 'completed' | 'canceled'

export interface CarePlanListParamsStartAt {
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

export interface CarePlanListParamsEndAt {
  /**
   * Return results where the end_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the end_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the end_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the end_at field is greater than or equal to this value.
   */
  gte?: string
}

export interface CarePlanCreateParams {
  /**
   * Member to whom this care plan relates.
   */
  member: string
  /**
   * Name of this care plan. This name is visible to both members and users.
   */
  name: string
  /**
   * A long-form description of this care plan. This description is visible to
   * members and can be used to describe the purpose of the care plan in more detail.
   */
  description?: string | null
  /**
   * Current status of this care plan. By default, care plans are created in an
   * `active` status. You can use the `paused` status to stop activities associated
   * with the care plan and prevent any updates to the care plan, with the
   * expectation that the care plan will be reactivated in the future. Pausing a care
   * plan does not cancel associated tasks and intents that have already been
   * created. If you create a care plan ending in the past, for example as a
   * backload, you must also set the status to either `completed` or `canceled`. Care
   * plans in a `canceled` or `completed` status cannot be reactivated.
   */
  status?: CarePlanCreateParamsStatus
  /**
   * Timestamp indicating the start of the care plan. By default, `start_at` is set
   * to the current time on care plan creation. You can optionally set start_at to a
   * time in the past, for example in order to backload a historical care plan.
   * `start_at` cannot be set to a time in the future.
   */
  start_at?: string | null
  /**
   * Timestamp indicating the end of the care plan. When a care plan is completed or
   * canceled, the `end_at` time is automatically updated. You can optionally specify
   * `end_at` when creating a care plan in a canceled or completed status, in order
   * to reflect a time in the past, for example when backloading a historical care
   * plan. `end_at` must be a time at or after `start_at` and cannot be a time in the
   * future.
   */
  end_at?: string | null
  /**
   * An ordered list of activities associated with this care plan. Activities
   * represent actions the system should take while the care plan remains active. An
   * activity can optionally be configured to start at a future time and to recur.
   * For example, you can configure an activity to create a particular type of task
   * every four weeks, starting one month after the care plan's start date.
   */
  activities?: Array<CarePlanCreateParamsActivity>
}

export type CarePlanCreateParamsStatus = 'active' | 'paused' | 'completed' | 'canceled'

export interface CarePlanCreateParamsActivity {
  /**
   * Action to take when the activity is run. The action must specify an action type
   * and corresponding configuration matching the action type.
   */
  action: CarePlanCreateParamsActivityAction
  /**
   * When the activity should begin running. You can specify either an `absolute`
   * trigger type along with a specific date and time or a `relative` trigger type to
   * indicate a period of time after the start of the care plan. The relative trigger
   * type supports units of `day`, `week`, and `month`.
   */
  trigger?: CarePlanCreateParamsActivityTrigger
  /**
   * Defines the activity’s recurrence. If not set, the activity is expected to run
   * once. If neither `count` nor `until` is set, the activity runs indefinitely.
   */
  recurrence?: CarePlanCreateParamsActivityRecurrence
  time_zone: string
  /**
   * Timestamp when the activity was completed.
   */
  completed_at?: string | null
}

export interface CarePlanCreateParamsActivityAction0 {
  type: 'task'
  config: CarePlanCreateParamsActivityAction0Config
}

export interface CarePlanCreateParamsActivityAction0Config {
  /**
   * The ID or key of the task definition to use when creating the task.
   */
  task_definition: string
  /**
   * A brief summary of the task.
   */
  summary: string
}

export type CarePlanCreateParamsActivityAction = CarePlanCreateParamsActivityAction0

export interface CarePlanCreateParamsActivityTrigger0 {
  /**
   * Type of time-based trigger to use for this activity. If set to `absolute`,
   * specify the timestamp in the date parameter when this activity should run. If
   * set to `relative`, specify in the `amount` and `unit` parameters the amount of
   * time to wait after creation for the activity to run.
   */
  type: 'absolute'
  /**
   * Timestamp at which to trigger the activity.
   */
  date: string
}

export interface CarePlanCreateParamsActivityTrigger1 {
  /**
   * Type of time-based trigger to use for this activity. If set to `absolute`,
   * specify the timestamp in the date parameter when this activity should run. If
   * set to `relative`, specify in the `amount` and `unit` parameters the amount of
   * time to wait after creation for the activity to run.
   */
  type: 'relative'
  /**
   * Units for the time specified in `amount`.
   */
  unit: CarePlanCreateParamsActivityTrigger1Unit
  /**
   * Together with the `unit` parameter, the amount of time to wait after activity
   * creation until triggering the activity.
   */
  amount: number
}

export type CarePlanCreateParamsActivityTrigger1Unit = 'day' | 'week' | 'month'
export type CarePlanCreateParamsActivityTrigger =
  | CarePlanCreateParamsActivityTrigger0
  | CarePlanCreateParamsActivityTrigger1

export interface CarePlanCreateParamsActivityRecurrence {
  /**
   * How often the activity should recur. Source only supports 'weekly' at this time
   * (including "every N weeks", using `interval`).
   */
  frequency: 'weekly'
  /**
   * How many of the `frequency` intervals between each activity execution, i.e.
   * 'every N weeks'.
   */
  interval: number
  /**
   * How many total times the activity should execute.
   *
   * Only one of `count` or `until` can be set.
   */
  count?: number
  /**
   * The date at which the recurring activity ends. This date is inclusive, so if an
   * activity execution falls on this date, it will run. Only one of `count` or
   * `until` can be set.
   */
  until?: string
  /**
   * The days of the week on which the activity should occur. By providing multiple
   * days, you can indicate multiple recurring activities per week.
   */
  days_of_week: Array<CarePlanCreateParamsActivityRecurrenceDaysOfWeek>
}

export type CarePlanCreateParamsActivityRecurrenceDaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface CarePlanUpdateParams {
  /**
   * Name of this care plan. This name is visible to both members and users.
   */
  name?: string
  /**
   * A long-form description of this care plan. This description is visible to
   * members and can be used to describe the purpose of the care plan in more detail.
   */
  description?: string | null
  /**
   * Current status of this care plan. By default, care plans are created in an
   * `active` status. You can use the `paused` status to stop activities associated
   * with the care plan and prevent any updates to the care plan, with the
   * expectation that the care plan will be reactivated in the future. Pausing a care
   * plan does not cancel associated tasks and intents that have already been
   * created. If you create a care plan ending in the past, for example as a
   * backload, you must also set the status to either `completed` or `canceled`. Once
   * a care plan is canceled or completed, associated unresolved actions (for
   * example, tasks and intents) are canceled. Care plans in a `canceled` or
   * `completed` status cannot be reactivated.
   */
  status?: CarePlanUpdateParamsStatus
}

export type CarePlanUpdateParamsStatus = 'active' | 'paused' | 'completed' | 'canceled'

export class CarePlanResource extends Resource {
  /**
   * Lists all care plans.
   *
   * By default, the care plans returned are sorted by creation date, with the most
   * recently added care plan appearing first.
   */
  public list(
    params?: CarePlanListParams,
    options?: SourceRequestOptions,
  ): Promise<CarePlanListResponse> {
    return this.source.request('GET', '/v1/care_plans', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new care plan for a member.
   *
   * By default, the care plan is created in an active status using the current time
   * as the `start_at` timestamp. You can optionally set `start_at` to a time in the
   * past if you are creating a care plan that is already in progress. In order to
   * backload a care plan that has already ended, you can set both the `start_at` and
   * `end_at` parameters to times in the past, in which case you must also set the
   * status parameter to either `completed` or `canceled`. A completed or canceled
   * care plan cannot be reactivated or updated.
   */
  public create(params: CarePlanCreateParams, options?: SourceRequestOptions): Promise<CarePlan> {
    return this.source.request('POST', '/v1/care_plans', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves an existing care plan by its unique identifier.
   *
   * Care plans can be accessed by users in your organization. Additionally, members
   * can access their own care plans.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<CarePlan> {
    return this.source.request('GET', `/v1/care_plans/${id}`, {
      options,
    })
  }

  /**
   * Updates a care plan. Any parameters not provided will be left unchanged.
   *
   * Canceled and completed care plans can no longer be modified or reactivated. Once
   * a care plan is canceled or completed, associated unresolved actions (for
   * example, tasks and intents) are canceled. You can pause a care plan to indicate
   * that its activities should no longer generate new actions, while unresolved
   * actions that have already been created remain active. You can later update the
   * paused care plan to an active status when the plan is again in use.
   */
  public update(
    id: string,
    params?: CarePlanUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<CarePlan> {
    return this.source.request('POST', `/v1/care_plans/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes a care plan.
   *
   * Once a care plan is deleted, it can no longer be accessed or used. Associated
   * unresolved actions (for example, tasks and intents) are canceled. The deleted
   * care plan will still be visible on past completed and canceled actions that
   * reference the care plan. In general, deleting a care plan should only be done to
   * remove care plans that were entered in error. Otherwise, you can cancel or
   * complete the care plan.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<CarePlan> {
    return this.source.request('DELETE', `/v1/care_plans/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
