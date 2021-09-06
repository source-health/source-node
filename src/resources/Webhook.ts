import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Webhook {
  
  /**
   * Always `webhook`.
   */
  readonly object: string
  
  /**
   * Unique ID of the webhook.
   */
  readonly id: string
  
  /**
   * URL to which matching events will be delivered
   */
  readonly url: string
  
  /**
   * Events that will be delivered to the webhook.
   */
  readonly events: Array<string>
  
  /**
   * Whether or not the webhook is currently enabled.
   */
  readonly is_enabled: boolean
  
  /**
   * Signing secret to verify webhook sender (only available when the webhook is first created).
   */
  readonly secret?: string
  
  /**
   * Timestamp when the webhook was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp when the webhook was last updated.
   */
  readonly updated_at: string
}

interface ListAllWebhooksParams {
  
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
   * Limit results to just those webhooks that are configured for the given event.
   */
  readonly event?: Array<string>
}

interface ListAllWebhooksResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Webhook>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateAWebhookParams {
  
  /**
   * URL to which matching events will be delivered
   */
  readonly url: string
  
  /**
   * Events that will be delivered to this webhook
   */
  readonly events: Array<string>
  
  /**
   * Whether or not this webhook should be enabled to receive events
   */
  readonly is_enabled?: boolean
}

interface UpdateAWebhookParams {
  
  /**
   * URL to which matching events will be delivered
   */
  readonly url?: string
  
  /**
   * Events that will be delivered to this webhook
   */
  readonly events?: Array<string>
  
  /**
   * Whether or not this webhook should be enabled to receive events
   */
  readonly is_enabled?: boolean
}


export class WebhookContext extends BaseContext {
  
  /**
   * Lists all webhooks for the current account. The webhooks returned are sorted by creation date, with the most recently
   * created webhooks appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllWebhooksParams, options?: CatalystOptions): Promise<ListAllWebhooksResponse> {
    return this.catalyst.request("GET", `/v1/webhooks`, { 
      params,
      options,
    })
  }
  
  /**
   * A webhook endpoint must have a URL and a list of events.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateAWebhookParams, options?: CatalystOptions): Promise<Webhook> {
    return this.catalyst.request("POST", `/v1/webhooks`, { 
      params,
      options,
    })
  }
  
  /**
   * A webhook endpoint must have a url and a list of events.
   *
   * @param id Unique ID of the webhook
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Webhook> {
    return this.catalyst.request("GET", `/v1/webhooks/${id}`, { 
      options,
    })
  }
  
  /**
   * Updates the webhook endpoint. You may edit the URL and list of events for the webhook.
   *
   * @param id Unique ID of the webhook
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async update(id: string, params?: UpdateAWebhookParams, options?: CatalystOptions): Promise<Webhook> {
    return this.catalyst.request("POST", `/v1/webhooks/${id}`, { 
      params,
      options,
    })
  }
  
  /**
   * Removes a webhook from your account, which will stop sending events to your endpoint
   *
   * @param id Unique ID of the webhook
   * @param options Options to apply to this specific request
   */
  public async delete(id: string, options?: CatalystOptions): Promise<Webhook> {
    return this.catalyst.request("DELETE", `/v1/webhooks/${id}`, { 
      options,
    })
  }
  
}