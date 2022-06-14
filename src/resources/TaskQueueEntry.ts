import { Member } from './Member'
import { Task } from './Task'
import { Expandable } from './shared'

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
