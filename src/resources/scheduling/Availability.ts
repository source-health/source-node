import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Location } from '../Location'
import { User } from '../User'
import { Expandable } from '../shared'

import { AppointmentType } from './AppointmentType'

export interface AvailabilityRule {
  /**
   * The day of the week to which this rule applies, as an ISO day of week. The value
   * of this property must be a number from 1 to 7, where 1 represents Monday, and 7
   * represents Sunday.
   */
  day: number
  /**
   * The start time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Valid values for the start time of a
   * rule range from 00:00 to 23:59.
   */
  start: string
  /**
   * The end time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Unlike rule start times, end times may
   * range from 00:00 to 24:00, where 24:00 represents midnight at the end of the
   * day.
   */
  end: string
  /**
   * The first date from which this rule should apply, expressed as an ISO date. If
   * set to a non-null value, this rule will not be considered when evaluating
   * availability before the given date.
   */
  start_date: string | null
  /**
   * The last date on which this rule should apply, expressed as an ISO date. If set
   * to a non-null value, this rule will not be considered when evaluating
   * availability after the given date.
   */
  end_date: string | null
  /**
   * An optional set of appointment types that this availability rule is restricted
   * to. Only appointments of the specified types are bookable during the period of
   * this rule. Omitting this field or providing an empty array implies the rule can
   * accommodate booking any appointment type.
   *
   * Rules are additive - when rules with different appointment type restrictions
   * overlap in time, the set of all allowed appointment types in all overlapping
   * rules may be booked during the overlap.
   */
  appointment_types: Array<Expandable<AppointmentType>>
}

export interface AvailabilityOverrideRule {
  /**
   * The start time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Valid values for the start time of a
   * rule range from 00:00 to 23:59.
   */
  start: string
  /**
   * The end time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Unlike rule start times, end times may
   * range from 00:00 to 24:00, where 24:00 represents midnight at the end of the
   * day.
   */
  end: string
  /**
   * An optional set of appointment types that this override rule is restricted to.
   * Only appointments of the specified types are bookable during the period of this
   * override. Omitting this field or providing an empty array implies the override
   * can accommodate booking any appointment type.
   *
   * Appointment type constraints are additive - when overrides with different
   * appointment type restrictions overlap in time, the set of all allowed
   * appointment types in all overlapping rules may be booked during the overlap.
   */
  appointment_types: Array<Expandable<AppointmentType>>
}

export interface AvailabilityOverride {
  /**
   * The specific date of the override, specified as an ISO 8601 date string in the
   * format YYYY-mm-dd. There can only be one override object per date in this list.
   */
  date: string
  rules: Array<AvailabilityOverrideRule>
}

export interface Availability {
  /**
   * Always `availability`.
   */
  object: 'availability'
  /**
   * Unique ID for the availability.
   */
  id: string
  /**
   * User to whom this availability schedule corresponds. At this time, each user can
   * only have one availability schedule, and it's automatically created by Source.
   */
  user: Expandable<User>
  /**
   * Resource to which this availability schedule corresponds. Availability schedules
   * may belong to either a location or a user. Note that this property replaces the
   * `user` property, and should be preferred in all contexts.
   */
  resource: Expandable<User | Location>
  /**
   * The IANA time zone identifier in which this schedule should be interpreted. A
   * time zone must be provided, but can be set to UTC. All times in a user's
   * availability schedule are considered to be in "local" time, so they are
   * impossible to interpret without a time zone.
   *
   * Note that while availability schedules have a time zone field on them for
   * reference, the time zone is replicated from the bookable resource to which the
   * schedule is attached (currently only users). If you want to change the time zone
   * for the schedule, you need to instead change the time zone on the user. Source
   * will automatically detect the time zone change and update the schedule as well,
   * triggering an `availability.updated` event with the new zone.
   */
  time_zone: string
  /**
   * The list of rules for this person's availability. Each rule defines a day of
   * week, start and end time, and an optional array of appointment types to which
   * the rule applies. There may be multiple rules for a single day of the week. When
   * that happens, the rules represent multiple blocks of times that the user is
   * available in a given day. For example, you may be available from 9am-12pm, break
   * for lunch, and then be available 1pm-5pm.
   */
  rules: Array<AvailabilityRule>
  /**
   * Overrides to the availability rules for this schedule. Overrides are specific
   * dates on which the user's availability differs from their general rules. For
   * example, you may be available Monday through Friday 9am-5pm, but not available
   * on New Years Day.
   */
  overrides: Array<AvailabilityOverride>
  /**
   * Timestamp when the appointment type was created.
   */
  created_at: string
  /**
   * Timestamp when the appointment type was last updated.
   */
  updated_at: string
}

export interface AvailabilityUpdateForUserParamsRule {
  /**
   * The day of the week to which this rule applies, as an ISO day of week. The value
   * of this property must be a number from 1 to 7, where 1 represents Monday, and 7
   * represents Sunday.
   */
  day: number
  /**
   * The start time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Valid values for the start time of a
   * rule range from 00:00 to 23:59.
   */
  start: string
  /**
   * The end time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Unlike rule start times, end times may
   * range from 00:00 to 24:00, where 24:00 represents midnight at the end of the
   * day.
   */
  end: string
  /**
   * The first date from which this rule should apply, expressed as an ISO date. If
   * set to a non-null value, this rule will not be considered when evaluating
   * availability before the given date.
   */
  start_date?: string | null
  /**
   * The last date on which this rule should apply, expressed as an ISO date. If set
   * to a non-null value, this rule will not be considered when evaluating
   * availability after the given date.
   */
  end_date?: string | null
  /**
   * An optional set of appointment types that this availability rule is restricted
   * to. Only appointments of the specified types are bookable during the period of
   * this rule. Omitting this field or providing an empty array implies the rule can
   * accommodate booking any appointment type.
   *
   * Rules are additive - when rules with different appointment type restrictions
   * overlap in time, the set of all allowed appointment types in all overlapping
   * rules may be booked during the overlap.
   */
  appointment_types?: Array<string>
}

export interface AvailabilityUpdateForUserParamsOverrideRule {
  /**
   * The start time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Valid values for the start time of a
   * rule range from 00:00 to 23:59.
   */
  start: string
  /**
   * The end time of this rule. The value of this property is an ISO local time,
   * formatted as HH:mm, using 24 hour time. Unlike rule start times, end times may
   * range from 00:00 to 24:00, where 24:00 represents midnight at the end of the
   * day.
   */
  end: string
  /**
   * An optional set of appointment types that this override rule is restricted to.
   * Only appointments of the specified types are bookable during the period of this
   * override. Omitting this field or providing an empty array implies the override
   * can accommodate booking any appointment type.
   *
   * Appointment type constraints are additive - when overrides with different
   * appointment type restrictions overlap in time, the set of all allowed
   * appointment types in all overlapping rules may be booked during the overlap.
   */
  appointment_types?: Array<string>
}

export interface AvailabilityUpdateForUserParamsOverride {
  /**
   * The specific date of the override, specified as an ISO 8601 date string in the
   * format YYYY-mm-dd. There can only be one override object per date in this list.
   */
  date: string
  rules: Array<AvailabilityUpdateForUserParamsOverrideRule>
}

export interface AvailabilityUpdateForUserParams {
  /**
   * The time zone in which rules on this schedule should be evaluated.
   */
  time_zone?: string | null
  /**
   * The list of rules for this person's availability. Each rule defines a day of
   * week, start time, and end time of the rule. There may be multiple rules for a
   * single day of the week. When that happens, the rules represent multiple blocks
   * of times that the user is available in a given day. For example, you may be
   * available from 9am-12pm, break for lunch, and then be available 1pm-5pm. If two
   * availability blocks are provided on the same day which overlap with one another,
   * Source will merge those rules into one rule.
   */
  rules?: Array<AvailabilityUpdateForUserParamsRule>
  /**
   * Overrides to the availability rules for this schedule. Overrides are specific
   * dates on which the user's availability differs from their general rules. For
   * example, you may be available Monday through Friday 9am-5pm, but not available
   * on New Years Day.
   */
  overrides?: Array<AvailabilityUpdateForUserParamsOverride>
}

export class AvailabilityResource extends Resource {
  /**
   * Retrieves the availability schedule for a user.
   *
   * Each user in Source has an availability schedule created for them by default.
   * The availability schedules are unique for each environment, so test and live
   * mode will have different availability objects.
   */
  public retrieveForUser(user: string, options?: SourceRequestOptions): Promise<Availability> {
    return this.source.request('GET', `/v1/users/${user}/availability`, {
      options,
    })
  }

  /**
   * Updates an availability schedule for a user.
   *
   * You'll need to update a user's availability schedule to make them bookable for
   * appointments in Source.
   */
  public updateForUser(
    user: string,
    params?: AvailabilityUpdateForUserParams,
    options?: SourceRequestOptions,
  ): Promise<Availability> {
    return this.source.request('POST', `/v1/users/${user}/availability`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
