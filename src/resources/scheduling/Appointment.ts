import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { User } from '../User'
import { Expandable } from '../shared'

import { AppointmentType } from './AppointmentType'

export type AppointmentStatus = 'booked' | 'canceled'
export type AppointmentParticipantStatus = 'tentative' | 'accepted' | 'declined'

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

export type AppointmentVideoCallProvider = 'custom' | 'source'

export interface AppointmentVideoCall {
  /**
   * The video call provider. Source automatically generates video call links for
   * every appointment type that is configured to do so. Alternatively, you can use
   * the value `custom` to provide your own video call link.
   */
  provider: AppointmentVideoCallProvider
  /**
   * A unique secure token that identifies the video call and allows a member or a
   * user to join the call. This token is also present in the join URL.
   */
  token: string
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

export interface Appointment {
  /**
   * Always `appointment`.
   */
  object: 'appointment'
  /**
   * Unique ID for the Appointment.
   */
  id: string
  /**
   * Reference to the type of appointemnt that was booked.
   */
  appointment_type: Expandable<AppointmentType>
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
   * Timestamp when the appointment type was created.
   */
  created_at: string
  /**
   * Timestamp when the appointment type was last updated.
   */
  updated_at: string
}

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

export type AppointmentListParamsSort =
  | 'start_at'
  | 'end_at'
  | 'created_at'
  | '-start_at'
  | '-end_at'
  | '-created_at'
export type AppointmentListParamsStatus = 'booked' | 'canceled'

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

export interface AppointmentCreateParamsParticipant {
  /**
   * The participant to include on this appointment. Must be a valid user identifier.
   */
  participant: string
}

export type AppointmentCreateParamsVideoCallProvider = 'custom' | 'source'

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
   * A unique secure token that identifies the video call and allows a member or a
   * user to join the call.  This token is also present in the join URL.
   */
  token?: string | null
  /**
   * The URL to access the video call. Anyone with this link will be able to request
   * to join this video call, so you should ensure it is kept safe.
   */
  join_url?: string | null
  /**
   * Passcode used when joining the call. This value is not used for Source-generated
   * video calls, but it may be used if using a custom video provider that requires a
   * passcode.
   */
  passcode?: string | null
}

export interface AppointmentCreateParams {
  /**
   * Unique ID or key of the appointment type for this appointment.
   */
  appointment_type: string
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
   * the bookable window for an appointment type, or from creating appointments
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
   * It is not possible to modify the video call provider of an appointment, once
   * set.
   */
  video_call?: AppointmentCreateParamsVideoCall | null
}

export interface AppointmentUpdateParamsParticipant {
  /**
   * The participant to include on this appointment. Must be a valid user identifier.
   */
  participant: string
}

export type AppointmentUpdateParamsVideoCallProvider = 'custom' | 'source'

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
   * A unique secure token that identifies the video call and allows a member or a
   * user to join the call.  This token is also present in the join URL.
   */
  token?: string | null
  /**
   * The URL to access the video call. Anyone with this link will be able to request
   * to join this video call, so you should ensure it is kept safe.
   */
  join_url?: string | null
  /**
   * Passcode used when joining the call. This value is not used for Source-generated
   * video calls, but it may be used if using a custom video provider that requires a
   * passcode.
   */
  passcode?: string | null
}

export interface AppointmentUpdateParams {
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
   * the bookable window for an appointment type, or from creating appointments
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
   * It is not possible to modify the video call provider of an appointment, once
   * set.
   */
  video_call?: AppointmentUpdateParamsVideoCall | null
}

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
   * this check by setting the skip_constraintss param to true.
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
