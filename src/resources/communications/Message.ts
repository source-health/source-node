import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { File } from '../File'
import { Member } from '../Member'
import { User } from '../User'
import { Expandable } from '../shared'

import { Thread } from './Thread'

export type MessageType = 'text' | 'system'

export interface MessageAttachment {
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

export interface Message {
  /**
   * Always `message`.
   */
  object: 'message'
  /**
   * Unique ID of this Message.
   */
  id: string
  /**
   * The type of message that was sent. Text messages are messages from one user to
   * another, and represent most messages sent on the platform. System messages are
   * automatically generated when notable thread events occur (such as reassignments
   * and status changes).
   */
  type: MessageType
  /**
   * Thread to which the message belongs.
   */
  thread: Expandable<Thread>
  /**
   * Plain text contents of the message.
   */
  text: string
  /**
   * The person who sent this message.
   */
  sender: Expandable<Member | User>
  /**
   * The time at which this message was sent.
   */
  sent_at: string
  /**
   * Any attachments to the message, such as files.
   */
  attachments: Array<MessageAttachment>
  /**
   * The person or API key who sent the message on behalf of `sender`. If null, the
   * message sender was not impersonated.
   */
  impersonated_by: string | null
}

export interface MessageListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Message>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface MessageListParams {
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
   * Unique ID of the thread whose messages should be shown.
   */
  thread: string
}

export type MessageCreateParamsThreadActionsStatus =
  | 'awaiting_care_team'
  | 'awaiting_member'
  | 'closed'

export interface MessageCreateParamsThreadActions {
  /**
   * New status for the thread after sending this message. By default, Source will
   * set the thread status to 'awaiting_care_team' if the member sends the message,
   * and 'awaiting_member' if someone on the care team send the message.
   */
  status?: MessageCreateParamsThreadActionsStatus
}

export interface MessageCreateParamsAttachment {
  type: 'file'
  /**
   * Unique ID of the resource to be attached to this message. When attaching a file,
   * this should be set to the uploaded file's ID.
   */
  resource: string
}

export interface MessageCreateParams {
  /**
   * Unique ID of the thread to which the message belongs.
   */
  thread: string
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
  thread_actions?: MessageCreateParamsThreadActions
  attachments?: Array<MessageCreateParamsAttachment>
  /**
   * The ID of the user this message is being sent by. Required for sending messages
   * with an API key.
   */
  sender?: string
}

export class MessageResource extends Resource {
  /**
   * Returns a list of threads within the current account.
   *
   * The threads returned are sorted with the most recently updated appearing first.
   */
  public list(
    params: MessageListParams,
    options?: SourceRequestOptions,
  ): Promise<MessageListResponse> {
    return this.source.request('GET', '/v1/communication/messages', {
      query: params,
      options,
    })
  }

  /**
   * Creates a message within a thread.
   */
  public create(params: MessageCreateParams, options?: SourceRequestOptions): Promise<Message> {
    return this.source.request('POST', '/v1/communication/messages', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an Message. You need only supply the unique message
   * identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Message> {
    return this.source.request('GET', `/v1/communication/messages/${id}`, {
      options,
    })
  }
}
