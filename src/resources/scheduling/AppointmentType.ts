import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'

export type AppointmentTypeColor =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'

export interface AppointmentType {
  /**
   * Always `appointment_type`.
   */
  object: 'appointment_type'
  /**
   * Unique ID for the Appointment Type.
   */
  id: string
  /**
   * Unique key for this appointment type. You can use this when creating
   * appointments via the API. In order to avoid potential confusion when
   * distinguishing between appointment type IDs and appointment type keys, keys must
   * not start with `aptp_`.
   */
  key: string
  /**
   * Name of this appointment type. This will be visible to members when booking
   * appointments, and to users when using the Source UI.
   */
  name: string
  /**
   * A few sentence description of this appointment type. This description will be
   * shown to members when attempting to book an appointment of this type. While not
   * required, it can be helpful to share what the member might expect to happen
   * during this appointment or any resources thay should bring.
   */
  description: string | null
  /**
   * The default instructions that should be provided to members when booking this
   * type of appointment. When creating appointments via the API, these instructions
   * will automatically be applied to the appointment unless overriden. Members are
   * not able to change the instructions on an appointment when creating one, and
   * will also receive this set of instructions by default.
   */
  default_instructions: string | null
  /**
   * The default duration to apply to appointments of this type. Measured in minutes.
   */
  duration: number
  /**
   * The interval between two bookable slots for appointments of this type. Measured
   * in minutes.
   */
  slot_interval: number
  /**
   * The color used when showing appointments of this type on the calendar. This is
   * primarily used in the Source UI, but you're able to use this in your own system
   * as well.
   */
  color: AppointmentTypeColor
  /**
   * Whether or not this appointment can be booked directly by a member. If set to
   * false, this appointment can only be scheduled by a user. Note that appointment
   * types with bookable set to false are still visible to members, as they may still
   * have an appointment of that type scheduled. As a result, this does not function
   * as a security or privacy control.
   */
  bookable: boolean
  /**
   * Provides an additional buffer of time before an appointment to prepare. Buffers
   * do not change the appointment duration, but rather make the participants appear
   * "busy" for a certain amount of time before the appointment begins. Measured in
   * minutes.
   */
  buffer_before: number
  /**
   * Provides an additional buffer of time after an appointment to wrap up. Buffers
   * do not change the appointment duration, but rather make the participants appear
   * "busy" for a certain amount of time after the appointment ends. Measured in
   * minutes.
   */
  buffer_after: number
  /**
   * Controls how far in the future appointments can be booked. By default,
   * appointment types have a 60 day planning horizon. You can extend this if you'd
   * like members to be able to book appointments farther in the future. Setting to
   * null disables the planning horizon limit, and allows an appointment to be
   * created indefinitely into the future. Measured in days.
   */
  planning_horizon: number | null
  /**
   * Controls the minimum amount of advance notice in order to book appointments of
   * this type. For example, if this parameter is set to 60, members will only be
   * able to book appointments starting at least 60 minutes from now. This option is
   * only considered when members are booking appointments directly. Users can book
   * appointments at any time, including appointments in the past. Measured in
   * minutes.
   */
  minimum_notice: number
  /**
   * Timestamp when the appointment type was created.
   */
  created_at: string
  /**
   * Timestamp when the appointment type was last updated.
   */
  updated_at: string
  /**
   * Whether or not to create a video call for appointments of this type. Defaults to
   * false.
   */
  video_enabled: boolean
}

export interface AppointmentTypeListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<AppointmentType>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export type AppointmentTypeListParamsSort = 'created_at' | 'name' | '-created_at' | '-name'

export interface AppointmentTypeListParams {
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
   * Sort field for the results. A '-' prefix indicates sorting by that field in
   * descending order, otherwise the order will be ascending.
   */
  sort?: AppointmentTypeListParamsSort
  /**
   * Only return appointment types containing this substring. Case insensitive.
   */
  name?: string
  /**
   * Only return appointment types with this key. Appointment type keys are unique,
   * so when specifying a key through this param, you will only receive up to one
   * appointment type.
   */
  key?: string
  /**
   * When set to true, filter appointment types to only those which are bookable by a
   * member.
   */
  bookable?: boolean
}

export type AppointmentTypeCreateParamsColor =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'

export interface AppointmentTypeCreateParams {
  /**
   * Unique key for this appointment type. You can use this when creating
   * appointments via the API.
   */
  key: string
  /**
   * Name of this appointment type. This will be visible to members when booking
   * appointments, and to users when using the Source UI.
   */
  name: string
  /**
   * A few sentence description of this appointment type. This description will be
   * shown to members when attempting to book an appointment of this type. While not
   * required, it can be helpful to share what the member might expect to happen
   * during this appointment or any resources thay should bring.
   */
  description?: string | null
  /**
   * The default instructions that should be provided to members when booking this
   * type of appointment. When creating appointments via the API, these instructions
   * will automatically be applied to the appointment unless overriden. Members are
   * not able to change the instructions on an appointment when creating one, and
   * will also receive this set of instructions by default.
   */
  default_instructions?: string | null
  /**
   * The color used when showing appointments of this type on the calendar. This is
   * primarily used in the Source UI, but you're able to use this in your own system
   * as well. If no color is set, it will default to gray.
   */
  color?: AppointmentTypeCreateParamsColor
  /**
   * The default duration to apply to appointments of this type. Default durations
   * must be in multiples of 5 minutes. For example, 5 and 10 are valid durations,
   * but 6 and 14 are not. Always measured in minutes. Defaults to 30.
   */
  duration?: number
  /**
   * The interval between two bookable slots for appointments of this type. Like
   * durations, intervals must also be in multiples of 5 minutes. Always measured in
   * minutes. Defaults to 15.
   */
  slot_interval?: number
  /**
   * Whether or not this appointment can be booked directly by a member. If set to
   * false, this appointment can only be scheduled by a user. Note that appointment
   * types with bookable set to false are still visible to members, as they may still
   * have an appointment of that type scheduled. As a result, this does not function
   * as a security or privacy control. Defaults to true.
   */
  bookable?: boolean
  /**
   * Provides an additional buffer of time before an appointment to prepare. Buffers
   * do not change the appointment duration, but rather make the participants appear
   * "busy" for a certain amount of time before the appointment begins. Measured in
   * minutes. Must not be greater than 60 minutes.
   */
  buffer_before?: number
  /**
   * Provides an additional buffer of time after an appointment to wrap up. Buffers
   * do not change the appointment duration, but rather make the participants appear
   * "busy" for a certain amount of time after the appointment ends. Measured in
   * minutes. Must not be greater than 60 minutes.
   */
  buffer_after?: number
  /**
   * Controls how far in the future appointments can be booked. By default,
   * appointment types have a 60 day planning horizon. You can extend this if you'd
   * like members to be able to book appointments farther in the future. Setting to
   * null disables the planning horizon limit, and allows an appointment to be
   * created indefinitely into the future. Measured in days.
   */
  planning_horizon?: number | null
  /**
   * Controls the minimum amount of advance notice in order to book appointments of
   * this type. For example, if this parameter is set to 60, members will only be
   * able to book appointments starting at least 60 minutes from now. This option is
   * only considered when members are booking appointments directly. Users can book
   * appointments at any time, including appointments in the past. Measured in
   * minutes.
   */
  minimum_notice?: number
  /**
   * Whether or not to create a video call for appointments of this type. Defaults to
   * false.
   */
  video_enabled?: boolean
}

export type AppointmentTypeUpdateParamsColor =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'

export interface AppointmentTypeUpdateParams {
  /**
   * Unique key for this appointment type. You can use this when creating
   * appointments via the API.
   */
  key?: string
  /**
   * Name of this appointment type. This will be visible to members when booking
   * appointments, and to users when using the Source UI.
   */
  name?: string
  /**
   * A few sentence description of this appointment type. This description will be
   * shown to members when attempting to book an appointment of this type. While not
   * required, it can be helpful to share what the member might expect to happen
   * during this appointment or any resources thay should bring.
   */
  description?: string | null
  /**
   * The default instructions that should be provided to members when booking this
   * type of appointment. When creating appointments via the API, these instructions
   * will automatically be applied to the appointment unless overriden. Members are
   * not able to change the instructions on an appointment when creating one, and
   * will also receive this set of instructions by default.
   */
  default_instructions?: string | null
  /**
   * The color used when showing appointments of this type on the calendar. This is
   * primarily used in the Source UI, but you're able to use this in your own system
   * as well. If no color is set, it will default to gray.
   */
  color?: AppointmentTypeUpdateParamsColor
  /**
   * The default duration to apply to appointments of this type. Default durations
   * must be in multiples of 5 minutes. For example, 5 and 10 are valid durations,
   * but 6 and 14 are not. Always measured in minutes. Defaults to 30.
   */
  duration?: number
  /**
   * The interval between two bookable slots for appointments of this type. Like
   * durations, intervals must also be in multiples of 5 minutes. Always measured in
   * minutes. Defaults to 15.
   */
  slot_interval?: number
  /**
   * Whether or not this appointment can be booked directly by a member. If set to
   * false, this appointment can only be scheduled by a user. Note that appointment
   * types with bookable set to false are still visible to members, as they may still
   * have an appointment of that type scheduled. As a result, this does not function
   * as a security or privacy control. Defaults to true.
   */
  bookable?: boolean
  /**
   * Provides an additional buffer of time before an appointment to prepare. Buffers
   * do not change the appointment duration, but rather make the participants appear
   * "busy" for a certain amount of time before the appointment begins. Measured in
   * minutes. Must not be greater than 60 minutes.
   */
  buffer_before?: number
  /**
   * Provides an additional buffer of time after an appointment to wrap up. Buffers
   * do not change the appointment duration, but rather make the participants appear
   * "busy" for a certain amount of time after the appointment ends. Measured in
   * minutes. Must not be greater than 60 minutes.
   */
  buffer_after?: number
  /**
   * Controls how far in the future appointments can be booked. By default,
   * appointment types have a 60 day planning horizon. You can extend this if you'd
   * like members to be able to book appointments farther in the future. Setting to
   * null disables the planning horizon limit, and allows an appointment to be
   * created indefinitely into the future. Measured in days.
   */
  planning_horizon?: number | null
  /**
   * Controls the minimum amount of advance notice in order to book appointments of
   * this type. For example, if this parameter is set to 60, members will only be
   * able to book appointments starting at least 60 minutes from now. This option is
   * only considered when members are booking appointments directly. Users can book
   * appointments at any time, including appointments in the past. Measured in
   * minutes.
   */
  minimum_notice?: number
  /**
   * Whether or not to create a video call for appointments of this type. Defaults to
   * false.
   */
  video_enabled?: boolean
}

export class AppointmentTypeResource extends Resource {
  /**
   * Lists all available appointment types.
   */
  public list(
    params?: AppointmentTypeListParams,
    options?: SourceRequestOptions,
  ): Promise<AppointmentTypeListResponse> {
    return this.source.request('GET', '/v1/scheduling/appointment_types', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new appointment type on Source.
   *
   * After creating an appointment type, you can use the availability endpoints to
   * begin searching your team and scheduling them.
   */
  public create(
    params: AppointmentTypeCreateParams,
    options?: SourceRequestOptions,
  ): Promise<AppointmentType> {
    return this.source.request('POST', '/v1/scheduling/appointment_types', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieve an appointment type by its unique identifier.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<AppointmentType> {
    return this.source.request('GET', `/v1/scheduling/appointment_types/${id}`, {
      options,
    })
  }

  /**
   * Updates an appointment type.
   *
   * Appointments are linked to appointment types in Source, so changes made to an
   * appointment type will be visible on past appointments as well. However, some
   * fields, such as the duration and location of the appointment, are copied at the
   * time the appointment is created. Changing the duration of an appointment type
   * will not change the duration of past appointments.
   */
  public update(
    id: string,
    params?: AppointmentTypeUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<AppointmentType> {
    return this.source.request('POST', `/v1/scheduling/appointment_types/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes an appointment type from Source.
   *
   * Once an appointment type is deleted, it can no longer be used to schedule
   * further appointments. It will still be visible on past appointments that used
   * this type. You can delete an appontment type at any time.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<AppointmentType> {
    return this.source.request('DELETE', `/v1/scheduling/appointment_types/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
