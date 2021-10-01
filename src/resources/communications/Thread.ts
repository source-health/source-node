import { Resource } from '../../BaseResource'
import { SourceOptions } from '../../Source'
import { Member } from '../Member'
import { User } from '../User'
import { ThreadStatus } from '../shared'

export interface ThreadLastMessage {
  /**
   * Plain text contents of the message.
   */
  text: string
  /**
   * The person who sent this message.
   */
  sender: unknown
  /**
   * The time at which this message was sent.
   */
  sent_at: string
}

export interface Thread {
  /**
   * Always `thread`.
   */
  object: 'thread'
  /**
   * Unique ID of the thread.
   */
  id: string
  /**
   * The member to which this thread belongs.
   */
  member: string | Member
  /**
   * The user who is assigned to the thread and will be notified of new messages.
   */
  assignee: string | User | null
  /**
   * Current status of the thread.
   */
  status: unknown
  /**
   * Subject of the thread.
   */
  subject: string | null
  /**
   * Preview of the
   */
  last_message: ThreadLastMessage | null
  /**
   * Timestamp of when the thread was created.
   */
  created_at: string
  /**
   * Timestamp of when the thread was last updated.
   */
  updated_at: string
  /**
   * Timestamp of when the thread was last closed.
   */
  closed_at: string | null
}

export interface ThreadListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Thread>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface ThreadListParams {
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
   * Filter threads to only those belonging to the given member.
   */
  member?: string
  /**
   * Filter threads to only those assigned to the given user. The value `current` may
   * be used to indicate the currently authenticated user.
   */
  assignee?: string
  /**
   * Filter threads by status
   */
  status?: Array<ThreadStatus>
}

export interface ThreadCreateParams {
  /**
   * The ID of the member to which this thread belongs
   */
  member: string
  /**
   * The ID of the care team user to which this thread is currently assigned, if any.
   */
  assignee?: string
  /**
   * The thread subject.
   */
  subject?: string
  /**
   * Contents of the initial message in this thread.
   */
  text: string
}

export type ThreadUpdateParamsStatus = 'awaiting_care_team' | 'awaiting_member' | 'closed'

export interface ThreadUpdateParams {
  /**
   * ID of a user on the member's Care Team - assigns the thread to the new user.
   */
  assignee?: string | null
  /**
   * New status for the thread.
   */
  status?: ThreadUpdateParamsStatus
  /**
   * New subject for the thread.
   */
  subject?: string | null
}

export class ThreadResource extends Resource {
  /**
   * Returns a list of threads within the current account.
   *
   * The threads returned are sorted with the most recently updated appearing first.
   */
  public list(params?: ThreadListParams, options?: SourceOptions): Promise<ThreadListResponse> {
    return this.source.request('GET', '/v1/communication/threads', {
      params,
      options,
    })
  }

  /**
   * Creates a new messaging thread.
   */
  public create(params: ThreadCreateParams, options?: SourceOptions): Promise<Thread> {
    return this.source.request('POST', '/v1/communication/threads', {
      params,
      options,
    })
  }

  /**
   * Retrieves the details of an existing thread. You need only supply the unique
   * thread identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceOptions): Promise<Thread> {
    return this.source.request('GET', `/v1/communication/threads/${id}`, {
      options,
    })
  }

  /**
   * Change the thread status or subject, and re-assign the thread to a different
   * member of the Care Team.
   */
  public update(id: string, params?: ThreadUpdateParams, options?: SourceOptions): Promise<Thread> {
    return this.source.request('POST', `/v1/communication/threads/${id}`, {
      params,
      options,
    })
  }
}
