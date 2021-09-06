import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Measurementitems {
}

interface Measurement {
  
  /**
   * Always `measurement`.
   */
  readonly object: string
  
  /**
   * Unique ID of the measurement.
   */
  readonly id: string
  
  /**
   * Member to which this measurement belongs.
   */
  readonly member: string
  
  /**
   * The device that reported the reading.
   */
  readonly device: string
  
  /**
   * The kind of measurement being reported, which can either be numeric or composite.
   * 
   * If a measurement is of kind numeric, the properties value and unit will be set. If it is composite, then the items
   * dictionary will be set.
   */
  readonly kind: string
  
  /**
   * Numeric value of this measurement (non-numeric not supported at this time). Catalyst always returns measurements as
   * strings to avoid floating-point precision issues.
   */
  readonly value?: string
  
  /**
   * Unit that the measurement is reported in.
   */
  readonly unit?: string
  
  /**
   * The type of the measurement
   */
  readonly type: string
  
  /**
   * Measurements included in this composite. The key of this dictionary will be the measurement type alias.
   */
  readonly items: Measurementitems
  
  /**
   * Timestamp when the measurement was taken.
   */
  readonly time: string
  
  /**
   * Timestamp when the measurement was created.
   */
  readonly created_at: string
}

interface ListAllMeasurementsParamstime {
  
  /**
   * Return results where the time field is less than this value.
   */
  readonly lt?: string
  
  /**
   * Return results where the time field is less than or equal to this value.
   */
  readonly lte?: string
  
  /**
   * Return results where the time field is greater than this value.
   */
  readonly gt?: string
  
  /**
   * Return results where the time field is greater than or equal to this value.
   */
  readonly gte?: string
}

interface ListAllMeasurementsParams {
  
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
   * A time based range filter on the list based on the object time field. For example
   * '?time[gt]=2021-05-10T16:51:38.075Z&time[lte]=2021-05-26T16:51:38.075Z'. The value is a dictionary with the following:
   */
  readonly time?: ListAllMeasurementsParamstime
  
  /**
   * Filter measurements to only those belonging to the given member.
   */
  readonly member?: string
  
  /**
   * Filter measurements to only those of the given type.
   */
  readonly type?: Array<string>
}

interface ListAllMeasurementsResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Measurement>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateAMeasurementParams {
}


export class MeasurementContext extends BaseContext {
  
  /**
   * Lists all measurements for the current account. The measurements returned are sorted by     their timestamp, with the
   * most recently created measurements appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllMeasurementsParams, options?: CatalystOptions): Promise<ListAllMeasurementsResponse> {
    return this.catalyst.request("GET", `/v1/measurements`, { 
      params,
      options,
    })
  }
  
  /**
   * Creates a measurement, which can be of kind `numeric` (with a single value) or     kind `composite` (with a collection
   * of logically inseparable values (such as a     blood pressure reading). The shapes of these requests are different.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params?: CreateAMeasurementParams, options?: CatalystOptions): Promise<Measurement> {
    return this.catalyst.request("POST", `/v1/measurements`, { 
      params,
      options,
    })
  }
  
  /**
   * Return the details of a measurement (a reading from a Device)
   *
   * @param id Unique ID of the measurement.
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Measurement> {
    return this.catalyst.request("GET", `/v1/measurements/${id}`, { 
      options,
    })
  }
  
}