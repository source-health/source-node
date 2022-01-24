import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { File } from '../File'
import { Member } from '../Member'
import { User } from '../User'
import { Expandable, ThreadStatus } from '../shared'

export interface ThreadLastMessageAttachment {
  /**
   * The type of attachment. Currently, the only supported attachment type is `file`,
   * but other attachment types may be added.
   */
  type: 'file'
  /**
   * The resource which is attached to the message
   */
  resource: Expandable<File>
}

export interface ThreadLastMessage {
  /**
   * Plain text contents of the message.
   */
  text: string
  /**
   * Any attachments to the message, such as files.
   */
  attachments: Array<ThreadLastMessageAttachment>
  /**
   * The person who sent this message.
   */
  sender: Expandable<User | Member>
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
  member: Expandable<Member>
  /**
   * The user who is assigned to the thread and will be notified of new messages.
   */
  assignee: Expandable<User> | null
  /**
   * Current status of the thread.
   */
  status: ThreadStatus
  /**
   * Subject of the thread.
   */
  subject: string | null
  /**
   * Preview of the most recent text message in the thread.
   */
  last_message: ThreadLastMessage
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
  /**
   * Timestamp indicating the point through which the member has read. All messages
   * with a `sent_at` after this point are considered unread. If null, the member has
   * not seen any messages on this thread.
   */
  member_last_read: string | null
  /**
   * Timestamp of the last message that was sent on this thread. This message has
   * been read by the member if the last_read timestamp is greater than or equal to
   * the last_message_at timestamp
   */
  last_message_at: string
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

export type ThreadCreateParamsMessageThreadActionsStatus =
  | 'awaiting_care_team'
  | 'awaiting_member'
  | 'closed'

export interface ThreadCreateParamsMessageThreadActions {
  /**
   * New status for the thread after sending this message. By default, Source will
   * set the thread status to 'awaiting_care_team' if the member sends the message,
   * and 'awaiting_member' if someone on the care team send the message.
   */
  status?: ThreadCreateParamsMessageThreadActionsStatus
}

export interface ThreadCreateParamsMessageAttachment {
  type: 'file'
  /**
   * Unique ID of the resource to be attached to this message. When attaching a file,
   * this should be set to the uploaded file's ID.
   */
  resource: string
}

export interface ThreadCreateParamsMessage {
  /**
   * Contents of the message to send.
   */
  text: string
  /**
   * Actions to apply to the thread after the message has been sent. Source
   * guarantees that these actions will only be applied if the message has been
   * successfully sent. See the documentation for nested params for information about
   * each available action.
   */
  thread_actions?: ThreadCreateParamsMessageThreadActions
  attachments?: Array<ThreadCreateParamsMessageAttachment>
  /**
   * When calling this endpoint with an API key, you must use this field to specify
   * the user on whose behalf the message is sent.
   */
  sender?: string
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
   * The initial message to send when creating this thread.
   */
  message: ThreadCreateParamsMessage
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

export interface ThreadMarkParams {
  /**
   * Timestamp indicating the point through which the member has read. All messages
   * with a `sent_at` after this point are considered unread. If null, the member has
   * not seen any messages on this thread.
   */
  member_last_read: string | null
}

export class ThreadResource extends Resource {
  /**
   * Returns a list of threads within the current account.
   *
   * The threads returned are sorted with the most recently updated appearing first.
   */
  public list(
    params?: ThreadListParams,
    options?: SourceRequestOptions,
  ): Promise<ThreadListResponse> {
    return this.source.request('GET', '/v1/communication/threads', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new messaging thread.
   */
  public create(params: ThreadCreateParams, options?: SourceRequestOptions): Promise<Thread> {
    return this.source.request('POST', '/v1/communication/threads', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing thread. You need only supply the unique
   * thread identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Thread> {
    return this.source.request('GET', `/v1/communication/threads/${id}`, {
      options,
    })
  }

  /**
   * Change the thread status or subject, and re-assign the thread to a different
   * member of the Care Team.
   */
  public update(
    id: string,
    params?: ThreadUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Thread> {
    return this.source.request('POST', `/v1/communication/threads/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Marks a thread as read by the member. You can provide a timestamp through which
   * the member has read. All message appearing before this timestamp will be shown
   * as read by the member in the Source Elements SDK. If you're not using Elements,
   * you can use this timestamp to track where the member has read in your own
   * interface.
   *
   * Providing null marks the entire thread as unread.
   */
  public mark(
    id: string,
    params: ThreadMarkParams,
    options?: SourceRequestOptions,
  ): Promise<Thread> {
    return this.source.request('POST', `/v1/communication/threads/${id}/mark`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
