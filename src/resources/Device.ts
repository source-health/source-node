import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Device {
  
  /**
   * Always `device`.
   */
  readonly object: string
  
  /**
   * Unique ID of the device.
   */
  readonly id: string
  
  /**
   * Member to which this device belongs.
   */
  readonly member: string
  
  /**
   * Current status of the device.
   */
  readonly status: string
  
  /**
   * Display name of the device.
   */
  readonly name: string
  
  /**
   * Hardware ID of the device (e.g. IMEI or MAC address)
   */
  readonly hardware_address: string
  
  /**
   * Capabilities for the device, determined by types of measurements the device can report.
   */
  readonly capabilities: Array<string>
  
  /**
   * Last time we received any data or heartbeat from the device.
   */
  readonly last_seen_at: string
  
  /**
   * Last known battery level from the device, if available.
   */
  readonly battery_level: number
  
  /**
   * Timestamp when the device was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp when the device was last updated.
   */
  readonly updated_at: string
}

interface ListAllDevicesParams {
  
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
   * The ID of the member whose devices should be returned.
   */
  readonly member?: string
}

interface ListAllDevicesResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Device>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}


export class DeviceContext extends BaseContext {
  
  /**
   * Retrieves the details of an existing device. You need only supply the unique device identifier that was returned upon
   * device creation.
   *
   * @param id Unique ID of the device
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Device> {
    return this.catalyst.request("GET", `/v1/devices/${id}`, { 
      options,
    })
  }
  
  /**
   * Returns a list of devices within the current account. The devices returned are sorted by creation date, with the most
   * recently added devices appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllDevicesParams, options?: CatalystOptions): Promise<ListAllDevicesResponse> {
    return this.catalyst.request("GET", `/v1/devices`, { 
      params,
      options,
    })
  }
  
  /**
   * Deactivates a device, disabling its communication with Catalyst.
   *
   * @param id Unique ID of the device
   * @param options Options to apply to this specific request
   */
  public async deactivate(id: string, options?: CatalystOptions): Promise<Device> {
    return this.catalyst.request("POST", `/v1/devices/${id}/deactivate`, { 
      options,
    })
  }
  
}