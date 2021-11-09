import { Member } from './Member'
import { Task } from './Task'

export interface Resource {
  object: string
  id: string
}

export type Brand<T, K extends string> = T & { __brand: K }
export type Pointer<T> = Brand<string, 'pointer'> & { __referenced: T }
export type Expandable<T extends Resource = Resource> = Pointer<T> | T

export interface TaskQueueEntry {
  /**
   * Always `task_queue_entry`
   */
  object: string
  /**
   * The member to which the tasks belong.
   */
  member: Expandable<Member>
  /**
   * List of open tasks outstanding for the member.
   */
  tasks: Array<Task>
}

export type ThreadStatus = 'awaiting_care_team' | 'awaiting_member' | 'closed'
export type WebhookEvents =
  | 'account.updated'
  | 'care_team.created'
  | 'care_team.updated'
  | 'care_team.deleted'
  | 'device.created'
  | 'device.activated'
  | 'device.deactivated'
  | 'device.deleted'
  | 'file.created'
  | 'measurement.created'
  | 'order.created'
  | 'order.shipped'
  | 'member.created'
  | 'member.updated'
  | 'member.deleted'
  | 'message.created'
  | 'task.created'
  | 'task.updated'
  | 'task_definition.created'
  | 'task_definition.updated'
  | 'thread.created'
  | 'thread.updated'
  | 'webhook.created'
  | 'webhook.updated'
  | 'webhook.deleted'
