import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Member } from './Member'
import { FormResponse } from './forms/FormResponse'
import { Appointment } from './scheduling/Appointment'
import { Expandable } from './shared'

export interface Intent {
  /**
   * Always `intent`.
   */
  object: 'intent'
  /**
   * Unique ID for the intent.
   */
  id: string
  /**
   * The member to whom this intent belongs.
   */
  member: Expandable<Member>
  /**
   * The type of intent that needs to be completed. Source supports two intent types:
   * 'scheduling' and 'form'.
   */
  type: IntentType
  /**
   * The current status of the intent. When the status is 'expired', 'canceled', or
   * 'completed', a member can no  longer use the intent. When a member fulfills an
   * intent, for example by booking an appointment or completing  a form response,
   * the status is updated automatically to 'completed'. When an intent is past its
   * expires_at time,  the status is updated automatically to 'expired'.
   */
  status: IntentStatus
  /**
   * Timestamp when this intent expires. By default, intents expire 30 days after
   * creation. Once the intent  reaches its expiration, the intent status is
   * automatically updated to 'expired' and can no longer be used.
   */
  expires_at: string
  /**
   * The URL to access the intent. Anyone with this link will be able to access the
   * intent, so you should ensure  it is kept safe.
   */
  link: string
  /**
   * A unique, secure token that identifies the intent and allows a member to access
   * it. You can use this token to  pass an intent into embeddable Source elements.
   * This token is also present in the the link URL.
   */
  secret: string
  /**
   * A set of configuration describing the appointment you wish the member to book or
   * form you wish the member to  complete. This parameter's configuration depends on
   * the intent type you specify.
   */
  configuration: IntentConfiguration
  /**
   * A resource created using this intent. For example, if an appointment is booked
   * using this intent, this field  contains that appointment ID. If a form response
   * is completed using this request, this field contains that form  response ID.
   */
  outcome: Expandable<Appointment | FormResponse> | null
  /**
   * Timestamp when the intent was created.
   */
  created_at: string
  /**
   * Timestamp when the intent was last updated.
   */
  updated_at: string
}

export type IntentType = 'scheduling' | 'form'
export type IntentStatus = 'active' | 'expired' | 'canceled' | 'completed'

export interface IntentConfiguration0 {
  /**
   * The key or identifier of the appointment type. If the intent type is
   * 'scheduling', this configuration  parameter is required.
   */
  appointment_type: string
  /**
   * The start time for the appointment availability search associated with this
   * intent. If not set, the  availability window will start at the time the member
   * accesses this intent to search for an appointment.
   */
  start_search_at?: string
  /**
   * The latest time for the appointment availability search associated with this
   * intent. If not set, the  availability window will end at the planning horizon of
   * the appointment type associated with the intent.
   */
  end_search_at?: string
  /**
   * Provide a set of users and groups that should be included when searching for
   * available slots using this intent.  The users and groups included in this
   * parameter must still be included in the appointment type's configuration  in
   * order for the availability API to return slots for them.
   */
  participants?: Array<IntentConfiguration0Participant>
  /**
   * The duration of the appointment to book, in minutes, using this intent. By
   * default, Source will use either the  appointment type's duration. However, you
   * may specify an alternative duration here to calculate slots for an  appointment
   * of a different length.
   *
   * Must be a number between 5 and 360 minutes (6 hours).
   */
  duration?: number
}

export type IntentConfiguration0Participant = string

export interface IntentConfiguration1 {
  /**
   * The key or identifier of the form. When the member accesses this intent, the
   * published version  of the form at that time is used to create the form response.
   * If the intent type is 'form', this  configuration parameter is required.
   */
  form: string
}

export type IntentConfiguration = IntentConfiguration0 | IntentConfiguration1

export interface IntentListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Intent>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface IntentListParams {
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
   * Filter results by member. If multiple member ids are provided, intents matching
   * any of the provided members will be returned. This param will be ignored if
   * calling this endpoint with a Member JWT.
   */
  member?: Array<string>
  /**
   * Filter results by type. If multiple types are provided, intents matching any of
   * the provided types will be returned.
   */
  type?: Array<IntentListParamsType>
  /**
   * Filter results by status. If multiple statuses are provided, intents matching
   * any of the provided statuses will be returned.
   */
  status?: Array<IntentListParamsStatus>
  /**
   * A time based range filter on the list based on the object created_at field. For
   * example
   * `?created_at[gt]=2021-05-10T16:51:38.075Z&created_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  created_at?: IntentListParamsCreatedAt
}

export type IntentListParamsType = 'scheduling' | 'form'
export type IntentListParamsStatus = 'active' | 'expired' | 'canceled' | 'completed'

export interface IntentListParamsCreatedAt {
  /**
   * Return results where the created_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the created_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the created_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the created_at field is greater than or equal to this
   * value.
   */
  gte?: string
}

export interface IntentCreateParams {
  /**
   * The member to whom this intent belongs.
   */
  member: string
  /**
   * The type of intent that needs to be completed. Source supports two intent types:
   * 'scheduling' and 'form'.
   */
  type: IntentCreateParamsType
  /**
   * Timestamp when this intent expires. By default, intents expire 30 days after
   * creation. Once the intent  reaches its expiration, the intent status is
   * automatically updated to 'expired' and can no longer be used.
   */
  expires_at?: string
  /**
   * A set of configuration describing the appointment you wish the member to book or
   * form you wish the member to  complete. This parameter's configuration depends on
   * the intent type you specify.
   */
  configuration: IntentCreateParamsConfiguration
}

export type IntentCreateParamsType = 'scheduling' | 'form'

export interface IntentCreateParamsConfiguration0 {
  /**
   * The key or identifier of the appointment type. If the intent type is
   * 'scheduling', this configuration  parameter is required.
   */
  appointment_type: string
  /**
   * The start time for the appointment availability search associated with this
   * intent. If not set, the  availability window will start at the time the member
   * accesses this intent to search for an appointment.
   */
  start_search_at?: string
  /**
   * The latest time for the appointment availability search associated with this
   * intent. If not set, the  availability window will end at the planning horizon of
   * the appointment type associated with the intent.
   */
  end_search_at?: string
  /**
   * Provide a set of users and groups that should be included when searching for
   * available slots using this intent.  The users and groups included in this
   * parameter must still be included in the appointment type's configuration  in
   * order for the availability API to return slots for them.
   */
  participants?: Array<IntentCreateParamsConfiguration0Participant>
  /**
   * The duration of the appointment to book, in minutes, using this intent. By
   * default, Source will use either the  appointment type's duration. However, you
   * may specify an alternative duration here to calculate slots for an  appointment
   * of a different length.
   *
   * Must be a number between 5 and 360 minutes (6 hours).
   */
  duration?: number
}

export type IntentCreateParamsConfiguration0Participant = string

export interface IntentCreateParamsConfiguration1 {
  /**
   * The key or identifier of the form. When the member accesses this intent, the
   * published version  of the form at that time is used to create the form response.
   * If the intent type is 'form', this  configuration parameter is required.
   */
  form: string
}

export type IntentCreateParamsConfiguration =
  | IntentCreateParamsConfiguration0
  | IntentCreateParamsConfiguration1

export class IntentResource extends Resource {
  /**
   * Returns a list of intents within the current account.
   *
   * The intents returned are sorted by creation date, with the most recently added
   * intent appearing first.
   */
  public list(
    params?: IntentListParams,
    options?: SourceRequestOptions,
  ): Promise<IntentListResponse> {
    return this.source.request('GET', '/v1/intents', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new intent of the type you specify. You must specify configuration
   * within the intent that corresponds  to the intent type you create. You can
   * create as many intents as you wish for a member.
   */
  public create(params: IntentCreateParams, options?: SourceRequestOptions): Promise<Intent> {
    return this.source.request('POST', '/v1/intents', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves an existing intent by its unique identifier or its secret.
   *
   * Intents can be accessed by users in your organization, and members can access
   * their own intents. Additionally, intents can be accessed by passing the intent
   * secret as a parameter.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Intent> {
    return this.source.request('GET', `/v1/intents/${id}`, {
      options,
    })
  }

  /**
   * Cancels an existing intent.
   *
   * Members can no longer access canceled intents and can optionally be filtered out
   * when displaying a list of intents.  Since existing intents cannot be updated,
   * you can instead cancel an intent and create a new intent to replace it.
   */
  public cancel(id: string, options?: SourceRequestOptions): Promise<Intent> {
    return this.source.request('POST', `/v1/intents/${id}/cancel`, {
      contentType: 'json',
      options,
    })
  }
}
