import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Location } from '../Location'
import { Member } from '../Member'
import { User } from '../User'
import { Encounter } from '../clinical/Encounter'
import { FormResponse } from '../forms/FormResponse'
import { Expandable } from '../shared'

import { AppointmentType } from './AppointmentType'

export interface Appointment {
  /**
   * Always `appointment`.
   */
  object: 'appointment'
  /**
   * Unique ID for the appointment.
   */
  id: string
  /**
   * The identifier of the type of appointment that was booked.
   */
  appointment_type: Expandable<AppointmentType> | null
  /**
   * The identifier of the physical location where the appointment is booked.
   */
  location: Expandable<Location> | null
  /**
   * The member to which this appointment belongs. Setting a member on this property
   * will allow the member to access this appointment via the API. Members can only
   * view appointments which are directly associated with them. You do not need to
   * associate an appointment with a member. This can be useful to represent, for
   * example, blocked time during which a user is not available.
   */
  member: Expandable<Member> | null
  /**
   * Subject for this appointment. These will be shared with all participants in
   * advance. The subject should generally describe the reason for the visit. Member
   * tokens are allowed to set subjects on appointments to support a self booking
   * flow.
   */
  subject: string | null
  /**
   * Instructions to the member describing how to prepare for this appointment.
   * Members cannot set or update instructions through the API, but they are able to
   * access them.
   */
  instructions: string | null
  /**
   * The IANA time zone for the appointment booking. Appointments are represented in
   * UTC time, however the zone will be stored and can be used when presenting the
   * appointemnt in the future.
   */
  time_zone: string
  /**
   * Current status of this appointment. By default, newly created appointments will
   * be in the booked status. When an appointment is in a terminal status, such as
   * `canceled`, it can no longer be modified.
   */
  status: AppointmentStatus
  /**
   * Timestamp when the appointment starts, always reported in UTC.
   */
  start_at: string
  /**
   * Timestamp when the appointment ends, always reported in UTC.
   */
  end_at: string
  /**
   * The computed duration of the appointment, measured as the number of minutes
   * between `start_at` and `end_at`. This is calculated automatically in the API and
   * returned back to you.
   */
  duration: number
  /**
   * The participants in the appointment. At this time, only users may be
   * participants in an appointment. However, we are evaluating future expansions to
   * the API to allow other types of bookable resources.
   */
  participants: Array<AppointmentParticipant>
  /**
   * Information about the video call generated or provided for this appointment. By
   * default, Source will generate a visit URL for all created appointments when the
   * appointment type has `video_enabled = true`.
   */
  video_call: AppointmentVideoCall | null
  /**
   * Indicates that this appointment was imported from an external integrated
   * calendar, such as Google Calendar. External appointments are managed by Source
   * directly and cannot be updated via API.
   */
  externally_managed: boolean
  /**
   * Defines the configuration of a recurring appointment. Appointments created as
   * recurring series will have `series_parent` = true, and Source will automatically
   * create an appointment for each available time in the series.
   *
   * Updating the series 'parent' appointment will update any unmodified future
   * appointments in the series, except for the start time, end times or duration.
   * Updating an individual appointment within the series will prevent the modified
   * fields from being updated when the series appointment is updated.  by default,
   * create a series of recurring appointments. Expressed as a subset of RRULE fields
   * (see [rrule.js docs](https://github.com/jakubroztocil/rrule#api) for more
   * context, but note that we only support a limited subset of the full RRULE spec).
   *
   * Note that creating an appointment using an appointment type that defines default
   * 'recurrence' configuration will not automatically result in a recurring series
   * being created. You must define the full recurrence configuration on the
   * appointment itself.
   *
   * Note: the recurring appointments feature is currently in preview. Please contact
   * Source for more details.
   */
  recurrence: AppointmentRecurrence | null
  /**
   * 'Parent' appointments do not represent an actual booking at that moment in time,
   * but are used for configuring a recurring series of appointments.
   *
   * Note: the recurring appointments feature is currently in preview. Please contact
   * Source for more details.
   */
  series_parent: boolean
  /**
   * Indicates that the appointment is part of a recurring series. The configuration
   * of the series is stored as a virtual 'parent' appointment, and this field is an
   * expandable reference to that parent appointment.
   *
   * Updating the parent appointment will update any unmodified future appointments
   * in the series. Updating an individual appointment within the series will prevent
   * the modified fields from being updated when the series appointment is updated.
   *
   * To cancel a series, transition the series appointment into 'canceled' status,
   * which will cancel any future appointments in the series.
   *
   * Note: the recurring appointments feature is currently in preview. Please contact
   * Source for more details.
   */
  series: Expandable<Appointment> | null
  /**
   * The identifier of the encounter to which this appointment relates.  This field
   * is returned when the appointment is related to an undeleted encounter.
   */
  encounter: Expandable<Encounter> | null
  /**
   * A list of form responses associated with this appointment. When an appointment
   * is booked, form responses can be created automatically based on appointment type
   * configuration. Members can then access and complete form responses, for example,
   * via appointment notifications.
   */
  form_responses: Array<Expandable<FormResponse>>
  /**
   * Timestamp when the appointment type was created.
   */
  created_at: string
  /**
   * Timestamp when the appointment type was last updated.
   */
  updated_at: string
}

export type AppointmentStatus = 'booked' | 'confirmed' | 'no_show' | 'completed' | 'canceled'

export interface AppointmentParticipant {
  /**
   * The type of participants. Participants in an appointment can be either members
   * or users.
   */
  type: 'user'
  /**
   * Expandable reference to the participant resource. Currently, only users can be
   * added as participants.
   */
  participant: Expandable<User>
  /**
   * Status of the participant. Currently, all participants are assumed to have
   * accepted the appointment once booked.
   */
  status: AppointmentParticipantStatus
}

export type AppointmentParticipantStatus = 'tentative' | 'accepted' | 'declined'

export interface AppointmentVideoCall {
  /**
   * The video call provider. Source automatically generates video call links for
   * every appointment type that is configured to do so. Alternatively, you can use
   * the value `custom` to provide your own video call link.
   */
  provider: AppointmentVideoCallProvider
  /**
   * A unique secure token that identifies the video call and allows a member or a
   * user to join the call. This token is only used for 'source' video calls, and is
   * also present in the join URL.
   */
  token: string | null
  /**
   * The URL to access the video call. Anyone with this link will be able to request
   * to join this video call, so you should ensure it is kept safe.
   */
  join_url: string
  /**
   * Passcode used when joining the call. This value is not used for Source-generated
   * video calls, but it may be used if using a custom video provider that requires a
   * passcode.
   */
  passcode: string | null
}

export type AppointmentVideoCallProvider = 'custom' | 'source'

export interface AppointmentRecurrence {
  /**
   * How often the appointments should recur. Source only supports 'weekly' at this
   * time (including "every N weeks", using 'interval').
   */
  frequency: 'weekly'
  /**
   * How many of the `frequency` intervals between each appointment, i.e. 'every N
   * weeks'.
   */
  interval: number
  /**
   * How many total appointments should be in the series.
   *
   * One and only one of `count` or `until` must be set.
   */
  count?: number
  /**
   * The date at which the recurring series will end. This date is inclusive, so if
   * an appointment instance falls on this date, that appointment will be booked. One
   * and only one of `count` or `until` must be set.
   */
  until?: string
  /**
   * The days of the week on which appointments should occur. By providing multiple
   * days, you can indicate multiple recurring appointments per week.
   */
  days_of_week: Array<AppointmentRecurrenceDaysOfWeek>
}

export type AppointmentRecurrenceDaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface AppointmentListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Appointment>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface AppointmentListParams {
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
  sort?: AppointmentListParamsSort
  /**
   * Filter appointments by their status. You may provide multiple statuses.
   */
  status?: Array<AppointmentListParamsStatus>
  /**
   * Filter appointments by the member. This parameter is inferred when called as a
   * member.
   */
  member?: Array<string>
  /**
   * Filter appointments by their participants. Participants must be provided as a
   * list of user identifiers.
   */
  participant?: Array<string>
  /**
   * Filter appointments by their type. You may provide appointment type identifiers
   * or keys.
   */
  type?: Array<string>
  /**
   * Filter appointments by whether they are externally managed or not (e.g. imported
   * from a Google calendar).
   */
  externally_managed?: boolean
  /**
   * When set to true, include the `series_parent` appointments that represent the
   * parent appointments for recurring series.
   */
  include_series_parent?: boolean
  /**
   * Filter appointments to those within the recurring series specified by the ID of
   * the `series_parent` appointment(s).
   */
  series?: Array<string>
  /**
   * A time based range filter on the list based on the object start_at field. For
   * example
   * `?start_at[gt]=2021-05-10T16:51:38.075Z&start_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  start_at?: AppointmentListParamsStartAt
  /**
   * A time based range filter on the list based on the object end_at field. For
   * example
   * `?end_at[gt]=2021-05-10T16:51:38.075Z&end_at[lte]=2021-05-26T16:51:38.075Z`. The
   * value is a dictionary with the following:
   */
  end_at?: AppointmentListParamsEndAt
}

export type AppointmentListParamsSort =
  | 'start_at'
  | 'end_at'
  | 'created_at'
  | '-start_at'
  | '-end_at'
  | '-created_at'
export type AppointmentListParamsStatus =
  | 'booked'
  | 'confirmed'
  | 'no_show'
  | 'completed'
  | 'canceled'

export interface AppointmentListParamsStartAt {
  /**
   * Return results where the start_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the start_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the start_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the start_at field is greater than or equal to this value.
   */
  gte?: string
}

export interface AppointmentListParamsEndAt {
  /**
   * Return results where the end_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the end_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the end_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the end_at field is greater than or equal to this value.
   */
  gte?: string
}

export interface AppointmentCreateParams {
  /**
   * Unique ID or key of the appointment type for this appointment.
   */
  appointment_type: string
  /**
   * The physical location where the appointment should be booked. Setting the
   * identifier of a physical location on this property is independent of whether you
   * wish there to be a video call or other modality associated with the appointment.
   * By default, no location is associated with the appointment.
   */
  location?: string | null
  /**
   * Time zone in which the appointment should be scheduled. Changing this value has
   * no impact on the actual time of the appointment, which is always provided in
   * UTC. However, this value may be used when formatting the appointment time for
   * representation, and recalculating the UTC time in the event of a time zone rule
   * change.
   */
  time_zone: string
  /**
   * The member to which this appointment belongs. Setting a member on this property
   * will allow the member to access this appointment via the API. Members can only
   * view appointments which are directly associated with them.
   */
  member?: string | null
  /**
   * Start time for this appointment. Appointments can be created which start in the
   * past, if you want to record an appointment that has already occured. Appointment
   * times must always be provided in UTC, regardless of the value of the time_zone
   * property.
   */
  start_at: string
  /**
   * The duration of the appointment, in minutes. If no duration is provided, it will
   * be automatically determined based on the appointment type provided.
   */
  duration?: number
  /**
   * End time for this appointment. When creating an appointment, you can optionally
   * specify either a duration or an end date. If both are specified, the end_at
   * timestamp will take precedence. If neither are provided, the appointment type's
   * default duration will be used.
   */
  end_at?: string
  /**
   * Subject of this appointment. This will be shown to all participants. It may also
   * be transmitted via email or SMS, so it should not include PHI.
   */
  subject?: string | null
  /**
   * Member instructions for the appointment, which will be shared in advance. It may
   * also be transmitted via email or SMS, so it should not include PHI.
   */
  instructions?: string | null
  /**
   * The participants that should be included on this appointment. At least one
   * participant is required.
   */
  participants: Array<AppointmentCreateParamsParticipant>
  /**
   * By default, Source runs a number of checks to prevent you from creating
   * appointments that seem unsafe. For example, we prevent you from creating
   * appointments that take place in the past, from creating appointments outside of
   * the bookable window for an appointment type, from creating appointments that
   * require licensure with unlicensed participants, or from creating appointments
   * during which one of the participants has a conflict.
   *
   * When calling the appointments endpoints with your API key, you can override this
   * behavior by setting the skip_constraints param to true, allowing you to create
   * your appointment. Note that some checks, such as ensuring the appointment end
   * time is after the start time, cannot be bypassed.
   *
   * Member tokens are unable to provide this parameter, and will receive a
   * permissions error if they attempt to.
   */
  skip_constraints?: boolean
  /**
   * Set the details of a video call, if this appointment will be a video visit. By
   * default any appointment for an appointment type with `video_enabled: true` will
   * have a Source video call created when the appointment is created.
   *
   * Members may not override the video call settings of an appointment, but users
   * and API keys are able to set `provider: 'source'` to create a Source-managed
   * call, or provide the details of a third-party video call.
   *
   * To remove all video call details, set this parameter to null.
   */
  video_call?: AppointmentCreateParamsVideoCall | null
  /**
   * Defines the configuration of a recurring appointment. Appointments created as
   * recurring series will have `series_parent` = true, and Source will automatically
   * create an appointment for each available time in the series.
   *
   * Updating the series 'parent' appointment will update any unmodified future
   * appointments in the series, except for the start time, end times or duration.
   * Updating an individual appointment within the series will prevent the modified
   * fields from being updated when the series appointment is updated.  by default,
   * create a series of recurring appointments. Expressed as a subset of RRULE fields
   * (see [rrule.js docs](https://github.com/jakubroztocil/rrule#api) for more
   * context, but note that we only support a limited subset of the full RRULE spec).
   *
   * Note that creating an appointment using an appointment type that defines default
   * 'recurrence' configuration will not automatically result in a recurring series
   * being created. You must define the full recurrence configuration on the
   * appointment itself.
   *
   * Note: the recurring appointments feature is currently in preview. Please contact
   * Source for more details.
   */
  recurrence?: AppointmentCreateParamsRecurrence | null
}

export interface AppointmentCreateParamsParticipant {
  /**
   * The participant to include on this appointment. Must be a valid user identifier.
   */
  participant: string
}

export interface AppointmentCreateParamsVideoCall {
  /**
   * The video call provider. Source automatically generates video call links for
   * every appointment type that is configured to do so. Alternatively, you can use
   * the value `custom` to provide your own video call link.  When providing
   * `custom`, you must provide a join URL and can optionally include a token or
   * passcode.
   */
  provider: AppointmentCreateParamsVideoCallProvider
  /**
   * The URL to access the video call. Anyone with this link will be able to request
   * to join this video call, so you should ensure it is kept safe. Only for 'custom'
   * video calls - for 'source' video calls, we generate the join URL.
   */
  join_url?: string | null
  /**
   * Passcode used when joining the call. This value is not used for Source-generated
   * video calls, but it may be used if using a custom video provider that requires a
   * passcode.
   */
  passcode?: string | null
}

export type AppointmentCreateParamsVideoCallProvider = 'custom' | 'source'

export interface AppointmentCreateParamsRecurrence {
  /**
   * How often the appointments should recur. Source only supports 'weekly' at this
   * time (including "every N weeks", using 'interval').
   */
  frequency: 'weekly'
  /**
   * How many of the `frequency` intervals between each appointment, i.e. 'every N
   * weeks'.
   */
  interval: number
  /**
   * How many total appointments should be in the series.
   *
   * One and only one of `count` or `until` must be set.
   */
  count?: number
  /**
   * The date at which the recurring series will end. This date is inclusive, so if
   * an appointment instance falls on this date, that appointment will be booked. One
   * and only one of `count` or `until` must be set.
   */
  until?: string
  /**
   * The days of the week on which appointments should occur. By providing multiple
   * days, you can indicate multiple recurring appointments per week.
   */
  days_of_week: Array<AppointmentCreateParamsRecurrenceDaysOfWeek>
}

export type AppointmentCreateParamsRecurrenceDaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface AppointmentUpdateParams {
  /**
   * Unique ID or key of the appointment type for this appointment.
   */
  appointment_type?: string
  /**
   * Time zone in which the appointment should be scheduled. Changing this value has
   * no impact on the actual time of the appointment, which is always provided in
   * UTC. However, this value may be used when formatting the appointment time for
   * representation, and recalculating the UTC time in the event of a time zone rule
   * change.
   */
  time_zone?: string
  /**
   * Start time for this appointment. Appointments can be created which start in the
   * past, if you want to record an appointment that has already occured. Appointment
   * times must always be provided in UTC, regardless of the value of the time_zone
   * property.
   */
  start_at?: string
  /**
   * The duration of the appointment, in minutes. If no duration is provided, it will
   * be automatically determined based on the appointment type provided.
   */
  duration?: number
  /**
   * End time for this appointment. When creating an appointment, you can optionally
   * specify either a duration or an end date. If both are specified, the end_at
   * timestamp will take precedence. If neither are provided, the appointment type's
   * default duration will be used.
   */
  end_at?: string
  /**
   * Subject of this appointment. This will be shown to all participants. It may also
   * be transmitted via email or SMS, so it should not include PHI.
   */
  subject?: string | null
  /**
   * Member instructions for the appointment, which will be shared in advance. It may
   * also be transmitted via email or SMS, so it should not include PHI.
   */
  instructions?: string | null
  /**
   * The participants that should be included on this appointment. At least one
   * participant is required.
   */
  participants?: Array<AppointmentUpdateParamsParticipant>
  /**
   * By default, Source runs a number of checks to prevent you from creating
   * appointments that seem unsafe. For example, we prevent you from creating
   * appointments that take place in the past, from creating appointments outside of
   * the bookable window for an appointment type, from creating appointments that
   * require licensure with unlicensed participants, or from creating appointments
   * during which one of the participants has a conflict.
   *
   * When calling the appointments endpoints with your API key, you can override this
   * behavior by setting the skip_constraints param to true, allowing you to create
   * your appointment. Note that some checks, such as ensuring the appointment end
   * time is after the start time, cannot be bypassed.
   *
   * Member tokens are unable to provide this parameter, and will receive a
   * permissions error if they attempt to.
   */
  skip_constraints?: boolean
  /**
   * Set the details of a video call, if this appointment will be a video visit. By
   * default any appointment for an appointment type with `video_enabled: true` will
   * have a Source video call created when the appointment is created.
   *
   * Members may not override the video call settings of an appointment, but users
   * and API keys are able to set `provider: 'source'` to create a Source-managed
   * call, or provide the details of a third-party video call.
   *
   * To remove all video call details, set this parameter to null.
   */
  video_call?: AppointmentUpdateParamsVideoCall | null
}

export interface AppointmentUpdateParamsParticipant {
  /**
   * The participant to include on this appointment. Must be a valid user identifier.
   */
  participant: string
}

export interface AppointmentUpdateParamsVideoCall {
  /**
   * The video call provider. Source automatically generates video call links for
   * every appointment type that is configured to do so. Alternatively, you can use
   * the value `custom` to provide your own video call link.  When providing
   * `custom`, you must provide a join URL and can optionally include a token or
   * passcode.
   */
  provider: AppointmentUpdateParamsVideoCallProvider
  /**
   * The URL to access the video call. Anyone with this link will be able to request
   * to join this video call, so you should ensure it is kept safe. Only for 'custom'
   * video calls - for 'source' video calls, we generate the join URL.
   */
  join_url?: string | null
  /**
   * Passcode used when joining the call. This value is not used for Source-generated
   * video calls, but it may be used if using a custom video provider that requires a
   * passcode.
   */
  passcode?: string | null
}

export type AppointmentUpdateParamsVideoCallProvider = 'custom' | 'source'

export interface AppointmentTransitionParams {
  status: AppointmentTransitionParamsStatus
  apply_to_series?: boolean
}

export type AppointmentTransitionParamsStatus =
  | 'booked'
  | 'confirmed'
  | 'no_show'
  | 'completed'
  | 'canceled'

export class AppointmentResource extends Resource {
  /**
   * List all appointments in a given time range, or for a given set of participants.
   *
   * By default, this method will not return canceled appointments. You can
   * optionally specify include_canceled to true in order to include canceled
   * appointments.
   */
  public list(
    params?: AppointmentListParams,
    options?: SourceRequestOptions,
  ): Promise<AppointmentListResponse> {
    return this.source.request('GET', '/v1/scheduling/appointments', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new appointment in Source.
   *
   * By default, you cannot create an appointment for a participant with a conflict
   * during the time of the appointment. If desired, you can disable this check by
   * setting the skip_constraints param to true.
   *
   * You are also able to call the create appointment API with a member token when
   * you are building a member-facing experience. In that case, members are only able
   * to book an appointment for themselves. Appointments created by members must
   * follow the rules of the selected appointment type, and the constraint checks may
   * not be bypassed.
   */
  public create(
    params: AppointmentCreateParams,
    options?: SourceRequestOptions,
  ): Promise<Appointment> {
    return this.source.request('POST', '/v1/scheduling/appointments', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves an existing appointment by its unique identifier.
   *
   * Appointments can be accessed by users in your organization. Additionally,
   * members can access their own appointments provided that they've been added as a
   * participant.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Appointment> {
    return this.source.request('GET', `/v1/scheduling/appointments/${id}`, {
      options,
    })
  }

  /**
   * Updates an appointment in Source.
   *
   * Parameters that are omitted from this endpoint will be left untouched. When
   * changing the time of an appointment, you can provide an updated start_at and
   * duration. If you omit one of these two, it will be inferred from the current
   * state of the event.
   *
   * When adding participants to an existing appointment, Source will only perform
   * conflict checks on the newly added participants, ignoring any potential
   * conflicts for participants who are already on the appointment. You may bypass
   * this check by setting the `skip_constraints` param to true.
   */
  public update(
    id: string,
    params?: AppointmentUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Appointment> {
    return this.source.request('POST', `/v1/scheduling/appointments/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Transitions an existing appointment into another status.
   *
   * Canceled appointments will not show up by default when listing appointments, but
   * they can be optionally requested. Appointments must be canceled before they can
   * be deleted. Once an appointment is canceled, it can no longer be modified.
   *
   * When canceling an appointment that is part of a series, you can optionally set
   * `apply_to_series: true`, which will additionally cancel any appointments in the
   * series after the given appointment.
   */
  public transition(
    id: string,
    params: AppointmentTransitionParams,
    options?: SourceRequestOptions,
  ): Promise<Appointment> {
    return this.source.request('POST', `/v1/scheduling/appointments/${id}/transition`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Cancels an existing appointment.
   *
   * Canceled appointments will not show up by default when listing appointments, but
   * they can be optionally requested. Appointments must be canceled before they can
   * be deleted. Once an appointment is canceled, it can no longer be modified.
   */
  public cancel(id: string, options?: SourceRequestOptions): Promise<Appointment> {
    return this.source.request('POST', `/v1/scheduling/appointments/${id}/cancel`, {
      contentType: 'json',
      options,
    })
  }
}
