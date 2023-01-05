import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Group } from './Group'
import { Expandable } from './shared'

export interface Queue {
  /**
   * Always `queue`.
   */
  object: 'queue'
  /**
   * Unique ID for the queue.
   */
  id: string
  /**
   * Public display name for this queue. The name must be unique across all queues.
   */
  name: string
  /**
   * A description for this queue.
   */
  description: string | null
  /**
   * Defines how a new task should be routed to the possible users defined in
   * `routing_targets`. Because of the complexity in routing, it's best explained by
   * example. Assume you have created a task that must be completed by a user in the
   * Physicians group, which you have specified in the queue's `routing_targets`. The
   * behavior of each routing strategy is as follows:
   *
   * * care_team_required - The task will be assigned only to a user who is in the
   * Physicians group and who is on the member's care team. If there are no
   * Physicians on the member's care team, the task will remain unassigned. If there
   * are multiple Physicians on the member's care team, the first physician on the
   * care team will be assigned the task.
   *
   * * care_team_preferred - The task will be assigned to a user who is in the
   * Physicians group and is on the member's care team, if there are any. If there
   * are no Physicians on the member's care team, the task will be assigned to
   * another user in the Physicians group.
   *
   * * round_robin - The task will be assigned to a user in the Physicians group, and
   * no preference will be given to users who are also on the member's care team.
   *
   * If more than one group is listed in the queue's `routing_targets`, each group
   * will be evaluated in order until a user assignment is found. If no user is found
   * in any group, the task will remain unassigned.
   *
   * By default, Source uses the `care_team_required` strategy to provide continuity
   * of care and ensure patients have a consistent experience. However, this is not
   * always the right task assignment strategy for all practices. In fact, even for a
   * single practice, you may sometimes need to reach for another routing method.
   */
  routing_strategy: QueueRoutingStrategy
  /**
   * The groups associated with the queue. The queue's groups define the users on
   * care teams who will receive automatically routed tasks.
   */
  routing_targets: Array<QueueRoutingTarget>
  /**
   * The ID of the queue to use as a replacement for task definitions and tasks that
   * reference the deleted queue. If not specified, Source removes the reference to
   * the deleted queue.
   */
  replacement_queue: Expandable<Queue>
  /**
   * Timestamp when the queue was created.
   */
  created_at: string
  /**
   * Timestamp when the queue was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the queue was deleted, which is only present for deleted queues.
   * Deleted queues are not typically returned by the API, however they are returned
   * in `queue.deleted` events and expanded references on other objects.
   */
  deleted_at?: string
}

export type QueueRoutingStrategy = 'care_team_required' | 'care_team_preferred' | 'round_robin'

export interface QueueRoutingTarget {
  /**
   * Expandable reference to the group resource.
   */
  group: Expandable<Group>
}

export interface QueueListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Queue>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface QueueListParams {
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
  sort?: QueueListParamsSort
  /**
   * Limit results to queues with name containing the given query.
   */
  name?: string
}

export type QueueListParamsSort = 'created_at' | 'name' | '-created_at' | '-name'

export interface QueueCreateParams {
  /**
   * Public display name for this queue. The name must be unique across all queues.
   */
  name: string
  /**
   * A description for this queue.
   */
  description?: string | null
  /**
   * Defines how a new task should be routed to the possible users defined in
   * `routing_targets`. Because of the complexity in routing, it's best explained by
   * example. Assume you have created a task that must be completed by a user in the
   * Physicians group, which you have specified in the queue's `routing_targets`. The
   * behavior of each routing strategy is as follows:
   *
   * * care_team_required - The task will be assigned only to a user who is in the
   * Physicians group and who is on the member's care team. If there are no
   * Physicians on the member's care team, the task will remain unassigned. If there
   * are multiple Physicians on the member's care team, the first physician on the
   * care team will be assigned the task.
   *
   * * care_team_preferred - The task will be assigned to a user who is in the
   * Physicians group and is on the member's care team, if there are any. If there
   * are no Physicians on the member's care team, the task will be assigned to
   * another user in the Physicians group.
   *
   * * round_robin - The task will be assigned to a user in the Physicians group, and
   * no preference will be given to users who are also on the member's care team.
   *
   * If more than one group is listed in the queue's `routing_targets`, each group
   * will be evaluated in order until a user assignment is found. If no user is found
   * in any group, the task will remain unassigned.
   *
   * By default, Source uses the `care_team_required` strategy to provide continuity
   * of care and ensure patients have a consistent experience. However, this is not
   * always the right task assignment strategy for all practices. In fact, even for a
   * single practice, you may sometimes need to reach for another routing method.
   */
  routing_strategy?: QueueCreateParamsRoutingStrategy
  /**
   * The groups associated with the queue. The queue's groups define the users on
   * care teams who will receive automatically routed tasks.
   */
  routing_targets?: Array<QueueCreateParamsRoutingTarget>
}

export type QueueCreateParamsRoutingStrategy =
  | 'care_team_required'
  | 'care_team_preferred'
  | 'round_robin'

export interface QueueCreateParamsRoutingTarget {
  /**
   * The group that is associated with the queue.
   */
  group: string
}

export interface QueueUpdateParams {
  /**
   * Public display name for this queue. The name must be unique across all queues.
   */
  name?: string
  /**
   * A description for this queue.
   */
  description?: string | null
  /**
   * Defines how a new task should be routed to the possible users defined in
   * `routing_targets`. Because of the complexity in routing, it's best explained by
   * example. Assume you have created a task that must be completed by a user in the
   * Physicians group, which you have specified in the queue's `routing_targets`. The
   * behavior of each routing strategy is as follows:
   *
   * * care_team_required - The task will be assigned only to a user who is in the
   * Physicians group and who is on the member's care team. If there are no
   * Physicians on the member's care team, the task will remain unassigned. If there
   * are multiple Physicians on the member's care team, the first physician on the
   * care team will be assigned the task.
   *
   * * care_team_preferred - The task will be assigned to a user who is in the
   * Physicians group and is on the member's care team, if there are any. If there
   * are no Physicians on the member's care team, the task will be assigned to
   * another user in the Physicians group.
   *
   * * round_robin - The task will be assigned to a user in the Physicians group, and
   * no preference will be given to users who are also on the member's care team.
   *
   * If more than one group is listed in the queue's `routing_targets`, each group
   * will be evaluated in order until a user assignment is found. If no user is found
   * in any group, the task will remain unassigned.
   *
   * By default, Source uses the `care_team_required` strategy to provide continuity
   * of care and ensure patients have a consistent experience. However, this is not
   * always the right task assignment strategy for all practices. In fact, even for a
   * single practice, you may sometimes need to reach for another routing method.
   */
  routing_strategy?: QueueUpdateParamsRoutingStrategy
  /**
   * The groups associated with the queue. The queue's groups define the users on
   * care teams who will receive automatically routed tasks.
   */
  routing_targets?: Array<QueueUpdateParamsRoutingTarget>
}

export type QueueUpdateParamsRoutingStrategy =
  | 'care_team_required'
  | 'care_team_preferred'
  | 'round_robin'

export interface QueueUpdateParamsRoutingTarget {
  /**
   * The group that is associated with the queue.
   */
  group: string
}

export interface QueueDeleteParams {
  /**
   * The ID of the queue to use as a replacement for task definitions and tasks that
   * reference the deleted queue. If not specified, Source removes the reference to
   * the deleted queue.
   */
  replacement_queue?: string
}

export class QueueResource extends Resource {
  /**
   * Returns a list of queues within the current account. The queues returned are
   * sorted by creation date, with the most recently added queue appearing first.
   */
  public list(
    params?: QueueListParams,
    options?: SourceRequestOptions,
  ): Promise<QueueListResponse> {
    return this.source.request('GET', '/v1/queues', {
      query: params,
      options,
    })
  }

  /**
   * Creates a queue, which describes related tasks that are typically completed by a
   * group of users. You can use queues alongside groups to configure how tasks are
   * routed among a member's care team.
   */
  public create(params: QueueCreateParams, options?: SourceRequestOptions): Promise<Queue> {
    return this.source.request('POST', '/v1/queues', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing queue. You need only supply the unique
   * queue identifier that was returned upon creation or that is referenced by a task
   * definition.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Queue> {
    return this.source.request('GET', `/v1/queues/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified queue by setting the values of the parameters passed. Any
   * parameters not provided will be left unchanged.
   */
  public update(
    id: string,
    params?: QueueUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Queue> {
    return this.source.request('POST', `/v1/queues/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified queue. When the queue is deleted, all open tasks and task
   * definitions referencing the queue will be updated with a replacement queue. You
   * can optionally specify the replacement queue for open tasks, otherwise Source
   * will use the current default queue. Note that for the short period of time
   * between when the queue is deleted and open tasks are updated with a replacement
   * queue, open tasks may reference the now deleted queue.
   */
  public delete(
    id: string,
    params?: QueueDeleteParams,
    options?: SourceRequestOptions,
  ): Promise<Queue> {
    return this.source.request('DELETE', `/v1/queues/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
