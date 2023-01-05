import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { User } from '../User'
import { Expandable } from '../shared'

import { RecurringSlot } from './RecurringSlot'

export interface Slot {
  /**
   * Always `slot`.
   */
  object: 'slot'
  /**
   * The start time of this appointment slot. Slot start times will be calculated
   * based on the available times of the bookable resources, as well as the selected
   * appointment type's slot interval.
   */
  start_at: string
  /**
   * The end time of this appointment slot. Slot end times are determined by taking
   * the slot start time and adding the appointment's duration. As a result, it's
   * possible (indeed likely) for slots returned from the API to overlap. For
   * example, if your appointment type has a 15 minute slot interval and a 30 minute
   * duration, your slots will be 10:00-10:30, 10:15-10:45, 10:30-11:00, and so on.
   */
  end_at: string
  /**
   * The preferred user to meet with if this slot is chosen. Source automatically
   * determines a preferred user for each slot based on the routing preferences
   * provided when looking up appointment slots.
   */
  preferred: Expandable<User>
  /**
   * The list of all possible users who are available during this appointment slot,
   * including the preferred user. We will only return users in this list if they are
   * able to serve the provided appointment type, are available according to their
   * availability, and have no conflicting appointments.
   */
  available: Array<Expandable<User>>
}

export interface SlotListResponse {
  /**
   * The list of all slots that were returned for your availability query. Slots will
   * only be returned if at least one participant is available.
   */
  slots: Array<Slot>
  /**
   * The list of all possible users who were considered during the availability
   * query. When using groups in participant inclusion and exclusion criteria, it is
   * often useful to know the list of possible users who were searched for
   * availability. You can use this to create a booking interface that shows your
   * team's photos or includes more information about each of them.
   *
   * Source guarantees that availability slots will not be returned for users who are
   * not present in this list, and that the list shown here is reflective of the
   * order that each user was considered when selecting a preferred user for each
   * time slot.
   */
  participants: Array<Expandable<User>>
}

export interface SlotListParams {
  /**
   * The appointment type to search. You may provide either the appointment types ID
   * or key. Note that the appointment type must be flagged as bookable in order for
   * the available slots API to succeed.
   */
  appointment_type: string
  /**
   * The member for whom the appointment is being booked. The member may influence
   * the results of this endpoint, depending on the routing choice selected below.
   *
   * When calling this endpoint as a member (using a member token), the member is
   * inferred and need not be provided. If it is provided, it must be the same as the
   * currently authenticated member.
   */
  member?: string
  /**
   * Region of the member for whom the appointment is being booked. This is
   * represented as an ISO-3166-2:US code. You can use this parameter when finding
   * slots when you don't yet have a member or if the member's address is missing. If
   * a member with an address is specified or inferred (using a member token), this
   * parameter should not be used and fails if the license_region does not match that
   * of the member. If a physical location is specified in the location parameter,
   * this parameter should not be used.
   */
  license_region?: string
  /**
   * The start time for the availability search. You may provide a fully qualified
   * timestamp at any point throughout the day. Note that Source always begins
   * computing slots at midnight, so the first available slot may not align with the
   * start_at timestamp you provide, even if a user is available.
   */
  start_at: string
  /**
   * The end time for the availability search. Must be after the start time. Source
   * will not return any time slots that start after this time, however it's possible
   * that a time slot may end after this time.
   */
  end_at: string
  /**
   * By default, slots are formatted in UTC time. Providing another time zone here
   * has two effects:
   *
   * - The slots returned from the API will be formatted in this time zone. This
   * differs from most other endpoints, which   always return times in UTC. - Source
   * will automatically strip out overlapping times in that zone due to daylight
   * savings. For example, when the   clock rolls back in November in
   * America/New_York, your bookable slots will be 2am, 2:30am, 3am, 3:30am (2am
   * happens   twice on this day, but Source will skip the second instance of it and
   * all other overlapping times.)
   */
  output_time_zone?: string
  /**
   * Provide a set of users and groups that should be included in the response. The
   * users and groups included in this parameter must still be included in the
   * appointment type's configuration in order for the availability API to return
   * slots for them.
   *
   * For example, if your appointment type is linked to the group "Physicians," and
   * when calling this API you provide an include parameter for the group "Nurses,"
   * you will only receive available slots for users who are in both the Physicians
   * and Nurses group.
   *
   * You can use this capability to enforce state licensing requirements when booking
   * visits. Place each physician in a group called Physicians, as well as one group
   * for each state in which they are licensed, such as "New York." Then, link your
   * intake visit appointment type to the "Physicians" group. Finally, when
   * onboarding a new member, provide an include parameter to the slots API
   * specifying your "New York" group and you'll see combined availability for all of
   * your New York physicians.
   */
  participants?: Array<SlotListParamsParticipant>
  /**
   * Provide a set of users and groups that should be explicitly excluded from
   * availability lookups. This can be used to ensure a particular user (or group of
   * users) will not be returned from this API. You may want to use this if a member
   * is requesting to change physicians, and you want to ensure that they're not
   * inadvertently booked with their same physician again.
   *
   * Note that if both include and exclude are provided, exclude takes precedence.
   * Source guarantees that users provided in the exclude parameter will never appear
   * in the slot results.
   */
  exclude_participants?: Array<SlotListParamsExcludeParticipant>
  /**
   * Controls the operator used when providing multiple groups to the `participants`
   * parameter. By default, participants use the `or` operator. If you want to only
   * show participants who are in multiple groups, you can use the `and` operator.
   * This operator will only impact the `participants` parameter, please see
   * `exclude_participant_operator` for the same option for exclusion.
   *
   * Note: when using the `and` filter, you should not provide user identifiers to
   * the `participants` parameter, because a user cannot have multiple identifiers at
   * the same time.
   */
  participant_operator?: SlotListParamsParticipantOperator
  /**
   * Controls the operator used when providing multiple groups to the
   * `exclude_participants` parameter. By default, participants use the `or`
   * operator. If you want to only show participants who are in multiple groups, you
   * can use the `and` operator. This operator will only impact the
   * `exclude_participants` parameter, please see `participant_operator` for the same
   * option for inclusion.
   *
   * Note: when using the `and` filter, you should not provide user identifiers to
   * the `exclude_participants` parameter, because a user cannot have multiple
   * identifiers at the same time.
   */
  exclude_participant_operator?: SlotListParamsExcludeParticipantOperator
  /**
   * Overrides the routing strategy configured on the appointment type. For more
   * information about the available routing strategies and how they work, see the
   * [Appointment Type](/docs/api/reference/appointment-type/) documentation.
   */
  routing_strategy?: SlotListParamsRoutingStrategy
  /**
   * Identifier of the appointment that is being rescheduled. When provided, Source
   * makes a few changes to availability calculation:
   *
   * - Source assumes the duration of the appointment should remain the same, and
   * thus will look for slots matching the appointment's current   duration, rather
   * than the appointment type's duration (which is the default behavior). - Source
   * will ignore the appointment when looking for conflicts, allowing you to rebook
   * the same slot or a slot which overlaps with the   appointment's current time
   * window.
   *
   * You should only provide rescheduling_appointment when you intend to update an
   * existing appointment, rather than to book a new appointment.
   */
  rescheduling_appointment?: string
  /**
   * The duration of the appointment to book, in minutes. By default, Source will use
   * either the appointment type's duration or, if provided, the rescheduling
   * appointment's duration. However, you may specify an alternative duration here to
   * calculate slots for an appointment of a different length.
   *
   * Must be a number between 5 and 360 minutes (6 hours).
   */
  duration?: number
  /**
   * Type of location for which to find availability. By default, slots are returned
   * for the `virtual` location type. If you specify a `physical` location type, you
   * must also specify the location's identifier in the `location` parameter.
   */
  location_type?: SlotListParamsLocationType
  /**
   * Identifier of the location for which to find availability. This parameter is
   * required if you specify a `physical` location in the `location_type` parameter.
   * If you are searching for `virtual` availability, this parameter should not be
   * used and fails if a location identifier is passed. If the appointment type
   * requires that license checks be performed, the location's region is used to
   * evaluate participants' licensure.
   */
  location?: string
}

export type SlotListParamsParticipant = string
export type SlotListParamsExcludeParticipant = string
export type SlotListParamsParticipantOperator = 'and' | 'or'
export type SlotListParamsExcludeParticipantOperator = 'and' | 'or'
export type SlotListParamsRoutingStrategy =
  | 'care_team_required'
  | 'care_team_preferred'
  | 'care_team_hybrid'
  | 'round_robin'
export type SlotListParamsLocationType = 'physical' | 'virtual'

export interface SlotListRecurringParams {
  /**
   * The appointment type of the proposed recurring series. You may provide either
   * the appointment types ID or key.
   */
  appointment_type: string
  /**
   * The start time of the proposed first appointment in the series.
   */
  start_at: string
  /**
   * The end time of the proposed first appointment in the series.
   */
  end_at: string
  /**
   * The time zone that recurring slots are calculated in. When the recurring series
   * crosses a daylight savings boundary, the time zone defines the behavior: "Every
   * Monday at 4pm" means "4pm in this time zone" and the appointment time will be
   * 4pm on before and after the daylight savings change.
   */
  time_zone: string
  /**
   * By default, slots are formatted in UTC time. Providing another time zone here
   * has only effect: the slots returned from the API will be formatted in this time
   * zone. This differs from most other endpoints, which always return times in UTC.
   */
  output_time_zone?: string
  /**
   * Provide a set of users that will be participating in the recurring appointments.
   * This should match the particpants selected for the proposed initial appointment.
   */
  participants: Array<string>
  /**
   * The configuration of the recurring series.
   */
  recurrence: SlotListRecurringParamsRecurrence
  /**
   * Identifier of the physical location for which to find availability. If no
   * location is provided, slots are returned for the `virtual` location type.
   */
  location?: string
}

export interface SlotListRecurringParamsRecurrence {
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
  days_of_week: Array<SlotListRecurringParamsRecurrenceDaysOfWeek>
}

export type SlotListRecurringParamsRecurrenceDaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export class SlotResource extends Resource {
  /**
   * This endpoint lists all bookable appointments slots for a set of users, given a
   * list of participants to include and a list of participants to exclude.
   *
   * This endpoint is accessible using member tokens, allowing your patient portal to
   * query the Source API for availability directly.
   *
   * Availability queries can only look at a maximum window of 31 days (a complete
   * calendar month). If you need to look at availability windows greater than 31
   * days, please reach out to our team.
   */
  public list(params: SlotListParams, options?: SourceRequestOptions): Promise<SlotListResponse> {
    return this.source.request('GET', '/v1/scheduling/slots', {
      query: params,
      options,
    })
  }

  /**
   * This endpoint lists all potential recurring instances of a recurring series,
   * given the proposed start timestamp of the first appointment in the series. The
   * response will indicate which instances of the series are not bookable due to
   * lack of provider availability or conflicting appointments.
   *
   * This endpoint is accessible using member tokens, allowing your patient portal to
   * query the Source API for availability directly.
   */
  public listRecurring(
    params: SlotListRecurringParams,
    options?: SourceRequestOptions,
  ): Promise<RecurringSlot> {
    return this.source.request('POST', '/v1/scheduling/recurring_slots', {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
