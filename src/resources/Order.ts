import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Ordershipping_address {
  
  /**
   * The first line of the street address.
   */
  readonly street_line_1: string
  
  /**
   * The second line of the street address.
   */
  readonly street_line_2: string
  
  /**
   * The city.
   */
  readonly city: string
  
  /**
   * The region - in the US this should be the two-letter state code.
   */
  readonly region: string
  
  /**
   * The postal code (i.e. zip code).
   */
  readonly postal_code: string
  
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country at this time.
   */
  readonly country: string
}

interface Orderitems {
  
  /**
   * Always `order_item`.
   */
  readonly object: string
  
  /**
   * Unique ID of the order line item
   */
  readonly id: string
  
  /**
   * Expandable reference to a Product
   */
  readonly product: string
  
  /**
   * Quantity of this product in the line item.
   */
  readonly quantity: number
  
  /**
   * Unit price for the line item (in cents).
   */
  readonly unit_price: number
  
  /**
   * Tax amount for this line item (in cents).
   */
  readonly tax_total: number
  
  /**
   * Total amount for this line item, including taxes (in cents).
   */
  readonly total: number
}

interface Orderfulfillment {
  
  /**
   * Always `fulfillment`.
   */
  readonly object: string
  
  /**
   * Unique ID of the fulfillment.
   */
  readonly id: string
  
  /**
   * Carrier that was used to fulfill the order.
   */
  readonly carrier: string
  
  /**
   * Tracking number for the package.
   */
  readonly tracking_number: string
  
  /**
   * Tracking URL to view the shipment status.
   */
  readonly tracking_url: string
  
  /**
   * Timestamp when the fulfillment was shipped.
   */
  readonly shipped_at: string
}

interface Order {
  
  /**
   * Always `order`.
   */
  readonly object: string
  
  /**
   * Unique ID for the order.
   */
  readonly id: string
  
  /**
   * The member that should receive this order.
   */
  readonly member: string
  
  /**
   * Current status of the order.
   */
  readonly status: string
  
  /**
   * Address to which the order will be shipped.
   */
  readonly shipping_address: Ordershipping_address
  
  /**
   * Items included in the order.
   */
  readonly items: Array<Orderitems>
  
  /**
   * Fulfillment details for the order, if it has been fulfilled.
   */
  readonly fulfillment: Orderfulfillment
  
  /**
   * Subtotal of all items on the order, not including tax or shipping (in cents).
   */
  readonly subtotal: number
  
  /**
   * Shipping amount for the order (in cents).
   */
  readonly shipping_subtotal: number
  
  /**
   * Tax amount paid, if applicable, on shipping (in cents)
   */
  readonly shipping_tax: number
  
  /**
   * Tax amount for the order (in cents).
   */
  readonly tax_total: number
  
  /**
   * Total inclusive of all taxes and shipping charges (in cents).
   */
  readonly total: number
  
  /**
   * Currency of the order, as an ISO 4217 3-letter code.
   */
  readonly currency: string
  
  /**
   * Timestamp when the order was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp when the order was last updated.
   */
  readonly updated_at: string
}

interface ListAllOrdersParams {
  
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
   * Limit results to orders for the given member.
   */
  readonly member?: string
}

interface ListAllOrdersResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Order>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateAnOrderParamsitems {
  
  /**
   * Unique ID of the product.
   */
  readonly product: string
}

interface CreateAnOrderParamsshipping_address {
  
  /**
   * The first line of the street address.
   */
  readonly street_line_1: string
  
  /**
   * The second line of the street address.
   */
  readonly street_line_2?: string
  
  /**
   * The city.
   */
  readonly city: string
  
  /**
   * The region - in the US this should be the two-letter state code.
   */
  readonly region: string
  
  /**
   * The postal code (i.e. zip code).
   */
  readonly postal_code: string
  
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country at this time.
   */
  readonly country: string
}

interface CreateAnOrderParams {
  
  /**
   * Member to which the order should be sent.
   */
  readonly member: string
  
  /**
   * Items that should be sent to the member.
   */
  readonly items: Array<CreateAnOrderParamsitems>
  
  /**
   * The address to which the items should be shipped. This field is optional as long as the member has an associated primary
   * address. If not, you must provide a shipping address for the order.
   */
  readonly shipping_address?: CreateAnOrderParamsshipping_address
}


export class OrderContext extends BaseContext {
  
  /**
   * Retrieves the details of an order. Supply the unique identifier of the order, which you might have received in a
   * webhook.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllOrdersParams, options?: CatalystOptions): Promise<ListAllOrdersResponse> {
    return this.catalyst.request("GET", `/v1/orders`, { 
      params,
      options,
    })
  }
  
  /**
   * Create an order to send devices to a member. Orders placed through the Catalyst API will be sent directly to our
   * fulfillment center, and generally shipped out the next day.
   * 
   * All orders sent out of our fulfillment center will be invoiced and payable at the end of the month.
   * 
   * When placing an order, you'll need to specify the products you would like to send to the member. Currently, you can send
   * the following products:
   * 
   * Scale: `prod_m0zvh4UpfvtRZasxVUwE`
   * 
   * Blood Pressure Monitor: `prod_1rqijtxD3sjkVVQPRRFC`
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateAnOrderParams, options?: CatalystOptions): Promise<Order> {
    return this.catalyst.request("POST", `/v1/orders`, { 
      params,
      options,
    })
  }
  
  /**
   * Retrieves the details of an order. Supply the unique identifier of the order, which you might have received in a
   * webhook.
   *
   * @param id Unique ID of the order
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Order> {
    return this.catalyst.request("GET", `/v1/orders/${id}`, { 
      options,
    })
  }
  
}