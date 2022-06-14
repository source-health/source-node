import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { File } from '../File'
import { Member } from '../Member'
import { User } from '../User'
import { Expandable } from '../shared'

import { Thread } from './Thread'

export type MessageType = 'text' | 'system'
export type MessageAttachmentType = 'file' | 'link'

export interface MessageAttachment {
  /**
   * The type of attachment. Currently, the only supported attachment types are
   * `file` and `link`, but other attachment types may be added.
   */
  type: MessageAttachmentType
  /**
   * A description of the attachment. If a file uploaded to Source is attached, the
   * file's name is displayed. Otherwise, this description is displayed.
   */
  description: string | null
  /**
   * The URL where the attachment's contents can be accessed. For link attachments,
   * the link to redirect. For file attachments, the URL returned by Source is a link
   * to the file.
   */
  url: string
  /**
   * The resource which is attached to the message
   */
  resource: Expandable<File> | null
  /**
   * A map of your own metadata to be included alongside this attachment. For
   * example, you can use this metadata for bookkeeping or rendering in your member
   * experience.
   *
   * Metadata may only be set when calling the API with your API keys. It cannot be
   * set when using member tokens.
   */
  metadata: Record<string, unknown>
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
   * Any attachments to the message, such as files and links.
   */
  attachments: Array<MessageAttachment>
  /**
   * The API key who created the message on behalf of `sender`. If null, the message
   * sender was not impersonated.
   */
  impersonated_by: string | null
  /**
   * The time at which this message redacted.
   */
  redacted_at: string | null
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

export type MessageCreateParamsAttachmentType = 'file' | 'link'

export interface MessageCreateParamsAttachment {
  /**
   * The type of attachment. Currently, the supported attachment types are `file` and
   * `link`. If set to file, then a resource must be provided. If set to link, then a
   * URL must be provided. Other attachment types may be added in the future.
   */
  type: MessageCreateParamsAttachmentType
  /**
   * A description of the attachment to display. If a file uploaded to Source is
   * attached, the file's name overrides a description and is displayed. Otherwise,
   * this description is displayed.
   */
  description?: string | null
  /**
   * Unique ID of the resource to be attached to this message. When attaching a file,
   * this should be set to the uploaded file's ID.
   */
  resource?: string
  /**
   * The URL where the attachment's contents can be accessed. For link attachments,
   * the link to redirect. For file attachments, the URL returned by Source is a link
   * to the file.
   */
  url?: string
  /**
   * A map of your own metadata to be included alongside this attachment. For
   * example, you can use this metadata for  bookkeeping or rendering in your member
   * experience.
   *
   * Metadata may only be set when calling the API with your API keys. It cannot be
   * set when using member tokens.
   */
  metadata?: Record<string, unknown>
}

export type MessageCreateParamsSender = string

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
   * When calling this endpoint with an API key, you must use this field to specify
   * the user or member on whose behalf the message is sent.
   */
  sender?: MessageCreateParamsSender
  /**
   * The time at which this message was sent.  When calling this endpoint with an API
   * key you can optionally specify the sent_at time, such as when backloading
   * historical messages.  By default and when called as a user or a member, the
   * current time is used.
   */
  sent_at?: string
}

export class MessageResource extends Resource {
  /**
   * Returns a list of messages within a thread.
   *
   * The messages returned are sorted with the most recently sent appearing first.
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

  /**
   * Redacts a message and its attachments that were sent in error to a member. You
   * can redact a message sent by a user or an API key on behalf of a user.
   *
   * Once redacted, the message content and any attachments are no longer accessible
   * to the member, however the fact that the message was redacted is displayed to
   * the member. The message is labeled as redacted and remains visible to users in
   * the Source UI or via API.
   */
  public redact(id: string, options?: SourceRequestOptions): Promise<Message> {
    return this.source.request('POST', `/v1/communication/messages/${id}/redact`, {
      contentType: 'json',
      options,
    })
  }
}
