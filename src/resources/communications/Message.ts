import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { User } from '../User'
import { Expandable } from '../shared'

import { Thread } from './Thread'

export type MessageType = 'text' | 'system'

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

export interface MessageCreateParams {
  /**
   * Unique ID of the thread to which the message belongs.
   */
  thread: string
  /**
   * Contents of the message to send.
   */
  text: string
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
