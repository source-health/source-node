import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Member } from './Member'
import { User } from './User'
import { Expandable } from './shared'

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
   * Actor whose action triggered this event. The actor may be a user, member, or
   * null. When the actor value is null, such as for an action being performed by the
   * system, the `actor_type` field is fully descriptive.
   */
  actor: Expandable<Member | User> | null
  /**
   * The type of actor whose action triggered this event. The `unknown` value should
   * only be present in historical events created prior to December 2021.
   */
  actor_type: EventActorType
  /**
   * The member on which this event was performed. This will be null on events that
   * are not specific to a single member.
   */
  member: Expandable<Member> | null
  /**
   * Payload contained within this event.
   */
  data: EventData
  /**
   * Timestamp when the event was created.
   */
  created_at: string
}

export type EventActorType = 'user' | 'member' | 'api' | 'system' | 'anonymous' | 'unknown'

export interface EventData {
  /**
   * Serialized object related to the event.
   */
  object: unknown
  /**
   * The previous values of any attributes that changed. This propery is typically
   * only returned on *.updated events which may have modified several fields in a
   * single request.
   */
  previous_values?: unknown
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
  /**
   * Filter results to show only those events that were performed by a certain type
   * of actor
   */
  actor_type?: Array<EventListParamsActorType>
  /**
   * Filter results to show only those events that were performed by a specific actor
   */
  actor?: Array<EventListParamsActor>
  /**
   * Filter results to show only those events that were performed on a specific
   * resource
   */
  resource?: Array<string>
  /**
   * Filter events for only those which pertain to the given members
   */
  member?: Array<string>
  /**
   * A time based range filter on the list based on the object created_at field. For
   * example
   * `?created_at[gt]=2021-05-10T16:51:38.075Z&created_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  created_at?: EventListParamsCreatedAt
}

export type EventListParamsActorType =
  | 'user'
  | 'member'
  | 'api'
  | 'system'
  | 'anonymous'
  | 'unknown'
export type EventListParamsActor = string

export interface EventListParamsCreatedAt {
  /**
   * Return results where the created_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the created_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the created_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the created_at field is greater than or equal to this
   * value.
   */
  gte?: string
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
