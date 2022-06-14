import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Group } from '../Group'
import { Expandable } from '../shared'

export type AppointmentTypeColor =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'
export type AppointmentTypeRoutingStrategy =
  | 'care_team_required'
  | 'care_team_preferred'
  | 'care_team_hybrid'
  | 'round_robin'

export interface AppointmentTypeLicenseType {
  /**
   * Code for the license type. For example, "MD".
   */
  code: string
  /**
   * Description of the license type. For example, "Doctor of Medcine".
   */
  description: string
}

export type AppointmentTypeReminderWhenUnit = 'minute' | 'hour' | 'day'

export interface AppointmentTypeReminderWhen {
  /**
   * The trigger for when this reminder should be scheduled. Currently, the only
   * supported value is `before`, indicating that this reminder should be triggered
   * based on the requested duration prior to the start of the appointment.
   */
  type: 'before'
  /**
   * The unit of time used in this reminder configuration. Units are interpreted
   * within the appointment's scheduled time zone, meaning 24 hours and 1 day are not
   * necessarily the same if the reminder window spans daylight savings.
   */
  unit: AppointmentTypeReminderWhenUnit
  /**
   * The number of units before the appointment at which this reminder should
   * trigger. Must be an integer greater than zero.
   */
  time: number
}

export interface AppointmentTypeReminder {
  when: AppointmentTypeReminderWhen
}

export interface AppointmentType {
  /**
   * Always `appointment_type`.
   */
  object: 'appointment_type'
  /**
   * Unique ID for the appointment type.
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
   * Whether or not to create a video call for appointments of this type. Defaults to
   * false.
   */
  video_enabled: boolean
  /**
   * Defines how an incoming slot availability query for the appointment type should
   * be routed to possible users. Because of the complexity in routing, it's best
   * explained by example. Assume you have created an appointment type that can be
   * fulfilled by users in the Physicians group. The behavior of each routing
   * strategy is as follows:
   *
   * - care_team_required - Appointment slots will only be shown for Physicians who
   * are on the member's care team. If there are   no Physicians on the member's care
   * team, the request will fail.
   *
   * - care_team_preferred - Appointment slots will be shown for any Physicians on
   * the member's care team.   If the Physicians on the care team aren't available,
   * slots will not be returned.   If there are no Physicians on the member's care
   * team, then slots will be returned for any available Physician.
   *
   * - care_team_hybrid - Appointment slots will be shown for all users in the
   * Physicians group. For any given appointment slot,   if a Physician of the
   * member's care team is available, they will be preferred. However, slots for
   * other Physicians will   still be shown.
   *
   * - round_robin - Appointment slots will be shown for all users in the Physicians
   * group, and no preference will be given to   users who are also on the member's
   * care team.
   *
   * By default, Source uses the care_team_preferred strategy to provide continuity
   * of care and ensure patients have a consistent experience. However, this is not
   * always the right booking strategy for all practices. In fact, even for a single
   * practice, you may sometimes need to reach for another routing method.
   *
   * If you have a need for a routing model that isn't covered above, please don't
   * hesitate to reach out to our team.
   */
  routing_strategy: AppointmentTypeRoutingStrategy
  /**
   * Select the groups that should be evaluated when booking an appointment. If no
   * group is specified, you will not be able to use the appointment slot API to find
   * bookable slots. When using the appointment slot API, you can specify more
   * specific users and groups. For example, if your appointment type is linked to
   * the group "Physicians," and when calling the slot API you provide an include
   * parameter for the group "Nurses," you only receive available slots for users who
   * are in both the Physicians and Nurses group.
   */
  groups: Array<Expandable<Group>>
  /**
   * The user license(s) that are required to perform appointments of this type. When
   * looking for appointment slots, only the availability of licensed users will be
   * returned. When booking an appointment without the skip_constraints parameter,
   * any licensed user must have a matching license type, otherwise a warning will be
   * returned. If more than one license code is provided, a licensed user with any of
   * the license codes can participate in the appointment. Providing any value will
   * override the entire array. Providing null or an empty array will empty out the
   * array.
   */
  license_types: Array<AppointmentTypeLicenseType>
  /**
   * The reminder configuration for this appointment type. Each appointment created
   * with this type will inherit the reminder configuration of the appointment type.
   * Changes to reminder configuration will be applied to all future appointments.
   *
   * You may configure up to five reminders per appointment type.
   */
  reminders: Array<AppointmentTypeReminder>
  /**
   * Timestamp when the appointment type was created.
   */
  created_at: string
  /**
   * Timestamp when the appointment type was last updated.
   */
  updated_at: string
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
export type AppointmentTypeCreateParamsRoutingStrategy =
  | 'care_team_required'
  | 'care_team_preferred'
  | 'care_team_hybrid'
  | 'round_robin'

export interface AppointmentTypeCreateParamsLicenseType {
  code: string
}

export type AppointmentTypeCreateParamsReminderWhenUnit = 'minute' | 'hour' | 'day'

export interface AppointmentTypeCreateParamsReminderWhen {
  /**
   * The trigger for when this reminder should be scheduled. Currently, the only
   * supported value is `before`, indicating that this reminder should be triggered
   * based on the requested duration prior to the start of the appointment.
   */
  type: 'before'
  /**
   * The unit of time used in this reminder configuration. Units are interpreted
   * within the appointment's scheduled time zone, meaning 24 hours and 1 day are not
   * necessarily the same if the reminder window spans daylight savings.
   */
  unit: AppointmentTypeCreateParamsReminderWhenUnit
  /**
   * The number of units before the appointment at which this reminder should
   * trigger. Must be an integer greater than zero.
   */
  time: number
}

export interface AppointmentTypeCreateParamsReminder {
  when: AppointmentTypeCreateParamsReminderWhen
}

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
   * Defines how an incoming slot availability query for the appointment type should
   * be routed to possible users. Because of the complexity in routing, it's best
   * explained by example. Assume you have created an appointment type that can be
   * fulfilled by users in the Physicians group. The behavior of each routing
   * strategy is as follows:
   *
   * - care_team_required - Appointment slots will only be shown for Physicians who
   * are on the member's care team. If there are   no Physicians on the member's care
   * team, the request will fail.
   *
   * - care_team_preferred - Appointment slots will be shown for any Physicians on
   * the member's care team.   If the Physicians on the care team aren't available,
   * slots will not be returned.   If there are no Physicians on the member's care
   * team, then slots will be returned for any available Physician.
   *
   * - care_team_hybrid - Appointment slots will be shown for all users in the
   * Physicians group. For any given appointment slot,   if a Physician of the
   * member's care team is available, they will be preferred. However, slots for
   * other Physicians will   still be shown.
   *
   * - round_robin - Appointment slots will be shown for all users in the Physicians
   * group, and no preference will be given to   users who are also on the member's
   * care team.
   *
   * By default, Source uses the care_team_preferred strategy to provide continuity
   * of care and ensure patients have a consistent experience. However, this is not
   * always the right booking strategy for all practices. In fact, even for a single
   * practice, you may sometimes need to reach for another routing method.
   *
   * If you have a need for a routing model that isn't covered above, please don't
   * hesitate to reach out to our team.
   */
  routing_strategy?: AppointmentTypeCreateParamsRoutingStrategy
  /**
   * Select the groups that should be evaluated when booking an appointment. If no
   * group is specified, you will not be able to use the appointment slot API to find
   * bookable slots. When using the appointment slot API, you can specify more
   * specific users and groups. For example, if your appointment type is linked to
   * the group "Physicians," and when calling the slot API you provide an include
   * parameter for the group "Nurses," you only receive available slots for users who
   * are in both the Physicians and Nurses group.
   */
  groups?: Array<string>
  /**
   * The user license(s) that are required to perform appointments of this type. When
   * looking for appointment slots, only the availability of licensed users will be
   * returned. When booking an appointment without the skip_constraints parameter,
   * any licensed user must have a matching license type, otherwise a warning will be
   * returned. If more than one license code is provided, a licensed user with any of
   * the license codes can participate in the appointment. Providing any value will
   * override the entire array. Providing null or an empty array will empty out the
   * array.
   */
  license_types?: Array<AppointmentTypeCreateParamsLicenseType> | null
  /**
   * Whether or not to create a video call for appointments of this type. Defaults to
   * false.
   */
  video_enabled?: boolean
  /**
   * The reminder configuration for this appointment type. Each appointment created
   * with this type will inherit the reminder configuration of the appointment type.
   * Changes to reminder configuration will be applied to all future appointments.
   *
   * You may configure up to five reminders per appointment type.
   */
  reminders?: Array<AppointmentTypeCreateParamsReminder>
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
export type AppointmentTypeUpdateParamsRoutingStrategy =
  | 'care_team_required'
  | 'care_team_preferred'
  | 'care_team_hybrid'
  | 'round_robin'

export interface AppointmentTypeUpdateParamsLicenseType {
  code: string
}

export type AppointmentTypeUpdateParamsReminderWhenUnit = 'minute' | 'hour' | 'day'

export interface AppointmentTypeUpdateParamsReminderWhen {
  /**
   * The trigger for when this reminder should be scheduled. Currently, the only
   * supported value is `before`, indicating that this reminder should be triggered
   * based on the requested duration prior to the start of the appointment.
   */
  type: 'before'
  /**
   * The unit of time used in this reminder configuration. Units are interpreted
   * within the appointment's scheduled time zone, meaning 24 hours and 1 day are not
   * necessarily the same if the reminder window spans daylight savings.
   */
  unit: AppointmentTypeUpdateParamsReminderWhenUnit
  /**
   * The number of units before the appointment at which this reminder should
   * trigger. Must be an integer greater than zero.
   */
  time: number
}

export interface AppointmentTypeUpdateParamsReminder {
  when: AppointmentTypeUpdateParamsReminderWhen
}

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
   * Defines how an incoming slot availability query for the appointment type should
   * be routed to possible users. Because of the complexity in routing, it's best
   * explained by example. Assume you have created an appointment type that can be
   * fulfilled by users in the Physicians group. The behavior of each routing
   * strategy is as follows:
   *
   * - care_team_required - Appointment slots will only be shown for Physicians who
   * are on the member's care team. If there are   no Physicians on the member's care
   * team, the request will fail.
   *
   * - care_team_preferred - Appointment slots will be shown for any Physicians on
   * the member's care team.   If the Physicians on the care team aren't available,
   * slots will not be returned.   If there are no Physicians on the member's care
   * team, then slots will be returned for any available Physician.
   *
   * - care_team_hybrid - Appointment slots will be shown for all users in the
   * Physicians group. For any given appointment slot,   if a Physician of the
   * member's care team is available, they will be preferred. However, slots for
   * other Physicians will   still be shown.
   *
   * - round_robin - Appointment slots will be shown for all users in the Physicians
   * group, and no preference will be given to   users who are also on the member's
   * care team.
   *
   * By default, Source uses the care_team_preferred strategy to provide continuity
   * of care and ensure patients have a consistent experience. However, this is not
   * always the right booking strategy for all practices. In fact, even for a single
   * practice, you may sometimes need to reach for another routing method.
   *
   * If you have a need for a routing model that isn't covered above, please don't
   * hesitate to reach out to our team.
   */
  routing_strategy?: AppointmentTypeUpdateParamsRoutingStrategy
  /**
   * Select the groups that should be evaluated when booking an appointment. If no
   * group is specified, you will not be able to use the appointment slot API to find
   * bookable slots. When using the appointment slot API, you can specify more
   * specific users and groups. For example, if your appointment type is linked to
   * the group "Physicians," and when calling the slot API you provide an include
   * parameter for the group "Nurses," you only receive available slots for users who
   * are in both the Physicians and Nurses group.
   */
  groups?: Array<string>
  /**
   * The user license(s) that are required to perform appointments of this type. When
   * looking for appointment slots, only the availability of licensed users will be
   * returned. When booking an appointment without the skip_constraints parameter,
   * any licensed user must have a matching license type, otherwise a warning will be
   * returned. If more than one license code is provided, a licensed user with any of
   * the license codes can participate in the appointment. Providing any value will
   * override the entire array. Providing null or an empty array will empty out the
   * array.
   */
  license_types?: Array<AppointmentTypeUpdateParamsLicenseType> | null
  /**
   * Whether or not to create a video call for appointments of this type. Defaults to
   * false.
   */
  video_enabled?: boolean
  /**
   * The reminder configuration for this appointment type. Each appointment created
   * with this type will inherit the reminder configuration of the appointment type.
   * Changes to reminder configuration will be applied to all future appointments.
   *
   * You may configure up to five reminders per appointment type.
   */
  reminders?: Array<AppointmentTypeUpdateParamsReminder>
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
