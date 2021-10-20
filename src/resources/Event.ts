import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export interface EventData {
  /**
   * Serialized object related to the event.
   */
  object: unknown
}

export interface Event {
  /**
   * Always `event`.
   */
  object: 'event'
  /**
   * Unique ID for the event.
   */
  id: string
  /**
   * Type of event.
   */
  type: string
  /**
   * Payload contained within this event.
   */
  data: EventData
  /**
   * Timestamp when the event was created.
   */
  created_at: string
}

export interface EventListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Event>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface EventListParams {
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
   * Filter results by event type. Repeat this parameter to filter by multiple event
   * types,         e.g. `?type=member.created&type=member.updated`
   */
  type?: Array<string>
}

export class EventResource extends Resource {
  /**
   * Each event data is rendered according to Source API version at its creation
   * time,       specified in event object api_version attribute (not according to
   * your current Source       API version or Source-Version header).
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Event> {
    return this.source.request('GET', `/v1/events/${id}`, {
      options,
    })
  }

  /**
   * List all stored events. Each event data is rendered according to Source API
   * version at its creation time, specified in event object api_version attribute
   * (not according       to your current Source API version or Source-Version
   * header).
   */
  public list(
    params?: EventListParams,
    options?: SourceRequestOptions,
  ): Promise<EventListResponse> {
    return this.source.request('GET', '/v1/events', {
      query: params,
      options,
    })
  }
}
