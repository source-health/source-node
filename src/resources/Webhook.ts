import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { WebhookEvents } from './WebhookEvents'

export interface Webhook {
  /**
   * Always `webhook`.
   */
  object: 'webhook'
  /**
   * Unique ID of the webhook.
   */
  id: string
  /**
   * URL to which matching events will be delivered
   */
  url: string
  /**
   * Events that will be delivered to the webhook.
   */
  events: Array<WebhookEvents>
  /**
   * Whether or not the webhook is currently enabled.
   */
  is_enabled: boolean
  /**
   * Signing secret to verify webhook sender (only available when the webhook is
   * first created).
   */
  secret?: string
  /**
   * Timestamp when the webhook was created.
   */
  created_at: string
  /**
   * Timestamp when the webhook was last updated.
   */
  updated_at: string
}

export interface WebhookListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Webhook>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface WebhookListParams {
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
   * Limit results to just those webhooks that are configured for the given event.
   */
  event?: Array<WebhookEvents>
}

export interface WebhookCreateParams {
  /**
   * URL to which matching events will be delivered
   */
  url: string
  /**
   * Events that will be delivered to this webhook
   */
  events: Array<WebhookEvents>
  /**
   * Whether or not this webhook should be enabled to receive events
   */
  is_enabled?: boolean
}

export interface WebhookUpdateParams {
  /**
   * URL to which matching events will be delivered
   */
  url?: string
  /**
   * Events that will be delivered to this webhook
   */
  events?: Array<WebhookEvents>
  /**
   * Whether or not this webhook should be enabled to receive events
   */
  is_enabled?: boolean
}

export class WebhookResource extends Resource {
  /**
   * Lists all webhooks for the current account. The webhooks returned are sorted by
   * creation date, with the most recently created webhooks appearing first.
   */
  public list(
    params?: WebhookListParams,
    options?: SourceRequestOptions,
  ): Promise<WebhookListResponse> {
    return this.source.request('GET', '/v1/webhooks', {
      query: params,
      options,
    })
  }

  /**
   * A webhook endpoint must have a URL and a list of events.
   */
  public create(params: WebhookCreateParams, options?: SourceRequestOptions): Promise<Webhook> {
    return this.source.request('POST', '/v1/webhooks', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing webhook. You need only supply the unique
   * webhook identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Webhook> {
    return this.source.request('GET', `/v1/webhooks/${id}`, {
      options,
    })
  }

  /**
   * Updates the webhook endpoint. You may edit the URL and list of events for the
   * webhook.
   */
  public update(
    id: string,
    params?: WebhookUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Webhook> {
    return this.source.request('POST', `/v1/webhooks/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Removes a webhook from your account, which will stop sending events to your
   * endpoint
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Webhook> {
    return this.source.request('DELETE', `/v1/webhooks/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
