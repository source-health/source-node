import { DeviceModel } from './monitoring/DeviceModel'
import { Expandable } from './shared'

export interface Product {
  /**
   * Always product.
   */
  object: 'product'
  /**
   * Unique ID of the product
   */
  id: string
  /**
   * The human-readable name of the product
   */
  name: string
  /**
   * Unit price of this product (in cents).
   */
  unit_price: number
  /**
   * Expandable reference to the DeviceModel
   */
  device_model: Expandable<DeviceModel> | null
}
