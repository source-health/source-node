import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { Expandable } from '../shared'

export interface Device {
  /**
   * Always `device`.
   */
  object: 'device'
  /**
   * Unique ID for the device.
   */
  id: string
  /**
   * Member to which this device belongs.
   */
  member: Expandable<Member>
  /**
   * Current status of the device.
   */
  status: DeviceStatus
  /**
   * Display name of the device.
   */
  name: string
  /**
   * Hardware ID of the device (e.g. IMEI or MAC address)
   */
  hardware_address: string | null
  /**
   * Capabilities for the device, determined by types of measurements the device can
   * report.
   */
  capabilities: Array<DeviceCapability>
  /**
   * Last time we received any data or heartbeat from the device.
   */
  last_seen_at: string | null
  /**
   * Last known battery level from the device, if available.
   */
  battery_level: number | null
  /**
   * Timestamp when the device was created.
   */
  created_at: string
  /**
   * Timestamp when the device was last updated.
   */
  updated_at: string
}

export type DeviceStatus = 'pending' | 'active' | 'deactivated'
export type DeviceCapability =
  | 'blood_glucose'
  | 'blood_oxygen_saturation'
  | 'blood_pressure'
  | 'body_weight'
  | 'diastolic_blood_pressure'
  | 'heart_rate'
  | 'systolic_blood_pressure'

export interface DeviceListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Device>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface DeviceListParams {
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
   * The ID of the member whose devices should be returned.
   */
  member?: string
}

export class DeviceResource extends Resource {
  /**
   * Retrieves the details of an existing device. You need only supply the unique
   * device identifier that was returned upon device creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Device> {
    return this.source.request('GET', `/v1/devices/${id}`, {
      options,
    })
  }

  /**
   * Returns a list of devices within the current account. The devices returned are
   * sorted by creation date, with the most recently added devices appearing first.
   */
  public list(
    params?: DeviceListParams,
    options?: SourceRequestOptions,
  ): Promise<DeviceListResponse> {
    return this.source.request('GET', '/v1/devices', {
      query: params,
      options,
    })
  }
}
