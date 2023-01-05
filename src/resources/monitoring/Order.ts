import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { Product } from '../Product'
import { Expandable } from '../shared'

export interface Order {
  /**
   * Always `order`.
   */
  object: 'order'
  /**
   * Unique ID for the order.
   */
  id: string
  /**
   * The member that should receive this order.
   */
  member: Expandable<Member>
  /**
   * Current status of the order.
   */
  status: OrderStatus
  /**
   * Address to which the order will be shipped.
   */
  shipping_address: OrderShippingAddress
  /**
   * Items included in the order.
   */
  items: Array<OrderItem>
  /**
   * Fulfillment details for the order, if it has been fulfilled.
   */
  fulfillment: OrderFulfillment | null
  /**
   * Subtotal of all items on the order, not including tax or shipping (in cents).
   */
  subtotal: number
  /**
   * Shipping amount for the order (in cents).
   */
  shipping_subtotal: number
  /**
   * Tax amount paid, if applicable, on shipping (in cents)
   */
  shipping_tax: number
  /**
   * Tax amount for the order (in cents).
   */
  tax_total: number
  /**
   * Total inclusive of all taxes and shipping charges (in cents).
   */
  total: number
  /**
   * Currency of the order, as an ISO 4217 3-letter code.
   */
  currency: string
  /**
   * Timestamp when the order was created.
   */
  created_at: string
  /**
   * Timestamp when the order was last updated.
   */
  updated_at: string
}

export type OrderStatus = 'pending' | 'fulfilled' | 'canceled'

export interface OrderShippingAddress {
  /**
   * The first line of the street address.
   */
  street_line_1: string
  /**
   * The second line of the street address.
   */
  street_line_2: string | null
  /**
   * The city.
   */
  city: string
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code: string
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export interface OrderItem {
  /**
   * Always `order_item`.
   */
  object: 'order_item'
  /**
   * Unique ID of the order line item
   */
  id: string
  /**
   * Expandable reference to a Product
   */
  product: Expandable<Product>
  /**
   * Quantity of this product in the line item.
   */
  quantity: number
  /**
   * Unit price for the line item (in cents).
   */
  unit_price: number
  /**
   * Tax amount for this line item (in cents).
   */
  tax_total: number
  /**
   * Total amount for this line item, including taxes (in cents).
   */
  total: number
}

export interface OrderFulfillment {
  /**
   * Always `fulfillment`.
   */
  object: 'fulfillment'
  /**
   * Unique ID of the fulfillment.
   */
  id: string
  /**
   * Carrier that was used to fulfill the order.
   */
  carrier: string
  /**
   * Tracking number for the package.
   */
  tracking_number: string
  /**
   * Tracking URL to view the shipment status.
   */
  tracking_url: string
  /**
   * Timestamp when the fulfillment was shipped.
   */
  shipped_at: string | null
}

export interface OrderListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Order>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface OrderListParams {
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
   * Limit results to orders for the given member.
   */
  member?: string
}

export interface OrderCreateParams {
  /**
   * Member to which the order should be sent.
   */
  member: string
  /**
   * Items that should be sent to the member.
   */
  items: Array<OrderCreateParamsItem>
  /**
   * The address to which the items should be shipped. This field is optional as long
   * as the member has an associated primary address. If not, you must provide a
   * shipping address for the order.
   */
  shipping_address?: OrderCreateParamsShippingAddress
}

export interface OrderCreateParamsItem {
  /**
   * Unique ID of the product.
   */
  product: string
}

export interface OrderCreateParamsShippingAddress {
  /**
   * The first line of the street address.
   */
  street_line_1: string
  /**
   * The second line of the street address.
   */
  street_line_2?: string | null
  /**
   * The city.
   */
  city: string
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code: string
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export class OrderResource extends Resource {
  /**
   * Retrieves the details of an order. Supply the unique identifier of the order,
   * which you might have received in a webhook.
   */
  public list(
    params?: OrderListParams,
    options?: SourceRequestOptions,
  ): Promise<OrderListResponse> {
    return this.source.request('GET', '/v1/orders', {
      query: params,
      options,
    })
  }

  /**
   * Create an order to send devices to a member. Orders placed through the Source
   * API will be sent directly to our fulfillment center, and generally shipped out
   * the next day.
   *
   * All orders sent out of our fulfillment center will be invoiced and payable at
   * the end of the month.
   *
   * When placing an order, you'll need to specify the products you would like to
   * send to the member. Currently, you can send the following products:
   *
   * Scale: `prod_m0zvh4UpfvtRZasxVUwE`
   *
   * Blood Pressure Monitor: `prod_1rqijtxD3sjkVVQPRRFC`
   */
  public create(params: OrderCreateParams, options?: SourceRequestOptions): Promise<Order> {
    return this.source.request('POST', '/v1/orders', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an order. Supply the unique identifier of the order,
   * which you might have received in a webhook.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Order> {
    return this.source.request('GET', `/v1/orders/${id}`, {
      options,
    })
  }
}
