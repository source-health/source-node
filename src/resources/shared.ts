import { Member } from "./Member";
import { Task } from "./Task";

export interface TaskQueueEntry {
    /**
     * Always `task_queue_entry`
     */
    object: string;
    /**
     * The member to which the tasks belong.
     */
    member: string | Member;
    /**
     * List of open tasks outstanding for the member.
     */
    tasks: Array<Task>;
}
