import { Member } from './Member'
import { Task } from './Task'

export interface Resource {
  object: string
  id: string
}

export type Brand<T, K extends string> = T & { __brand: K }
export type Pointer<T> = Brand<string, 'pointer'> & { __referenced: T }
export type Expandable<T extends Resource = Resource> = Pointer<T> | T
export type ErrorType =
  | 'api_error'
  | 'api_connection_error'
  | 'invalid_request_error'
  | 'authentication_error'
  | 'authorization_error'

export interface Error {
  object: 'error'
  /**
   * The type of error encountered.
   */
  type: ErrorType
  /**
   * For errors that could be handled programmatically, a short string indicating the
   * error code reported.
   */
  code: string
  /**
   * A human-readable message providing more details about the error.
   */
  message: string
  /**
   * Unique ID for the request where the error was encountered.
   */
  request_id: string | null
  /**
   * Additional information sent along with the error
   */
  meta?: Record<string, unknown>
}

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
  | 'appointment_type.created'
  | 'appointment_type.updated'
  | 'appointment_type.deleted'
  | 'appointment.created'
  | 'appointment.updated'
  | 'appointment.canceled'
  | 'appointment.deleted'
  | 'availability.created'
  | 'availability.updated'
  | 'availability.deleted'
  | 'care_team.created'
  | 'care_team.updated'
  | 'care_team.deleted'
  | 'device.created'
  | 'device.activated'
  | 'device.deactivated'
  | 'device.deleted'
  | 'file.created'
  | 'group.created'
  | 'group.updated'
  | 'group.deleted'
  | 'measurement.created'
  | 'member.created'
  | 'member.updated'
  | 'member.deleted'
  | 'message.created'
  | 'order.created'
  | 'order.shipped'
  | 'queue.created'
  | 'queue.updated'
  | 'queue.deleted'
  | 'task.created'
  | 'task.updated'
  | 'task_definition.created'
  | 'task_definition.updated'
  | 'thread.created'
  | 'thread.updated'
  | 'user.created'
  | 'user.updated'
  | 'user.deactivated'
  | 'user.reactivated'
  | 'webhook.created'
  | 'webhook.updated'
  | 'webhook.deleted'
