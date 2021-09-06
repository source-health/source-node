import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Eventdataobject {
}

interface Eventdata {
  
  /**
   * Serialized object related to the event.
   */
  readonly object: Eventdataobject
}

interface Event {
  
  /**
   * Always `event`.
   */
  readonly object: string
  
  /**
   * Unique ID for the event.
   */
  readonly id: string
  
  /**
   * Type of event.
   */
  readonly type: string
  
  /**
   * Payload contained within this event.
   */
  readonly data: Eventdata
  
  /**
   * Timestamp when the event was created.
   */
  readonly created_at: string
}

interface ListAllEventsParams {
  
  /**
   * A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if
   * you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  readonly ending_before?: string
  
  /**
   * A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if
   * you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  readonly starting_after?: string
  
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100.
   */
  readonly limit?: number
  
  /**
   * Filter results by event type. Repeat this parameter to filter by multiple event types,       e.g.
   * `?type=member.created&type=member.updated`
   */
  readonly type?: Array<string>
}

interface ListAllEventsResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Event>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}


export class EventContext extends BaseContext {
  
  /**
   * Each event data is rendered according to Catalyst API version at its creation time,       specified in event object
   * api_version attribute (not according to your current Catalyst       API version or Catalyst-Version header).
   *
   * @param id Unique ID of the event
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Event> {
    return this.catalyst.request("GET", `/v1/events/${id}`, { 
      options,
    })
  }
  
  /**
   * List all stored events. Each event data is rendered according to Catalyst API       version at its creation time,
   * specified in event object api_version attribute (not according       to your current Catalyst API version or
   * Catalyst-Version header).
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllEventsParams, options?: CatalystOptions): Promise<ListAllEventsResponse> {
    return this.catalyst.request("GET", `/v1/events`, { 
      params,
      options,
    })
  }
  
}