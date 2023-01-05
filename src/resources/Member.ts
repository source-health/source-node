import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { CareTeam } from './CareTeam'
import { File } from './File'
import { Integration } from './Integration'
import { Tag } from './Tag'
import { Expandable } from './shared'

export interface Member {
  /**
   * Always `member`.
   */
  object: 'member'
  /**
   * Unique ID for the member.
   */
  id: string
  /**
   * Title for the member (Mr., Mrs., Dr., etc).
   */
  title: string | null
  /**
   * First name of the member.
   */
  first_name: string
  /**
   * Middle name of the member.
   */
  middle_name: string | null
  /**
   * Last name of the member.
   */
  last_name: string
  /**
   * The member's preferred name. This could be a shortened or alternate name that
   * the member typically prefers to be called.
   */
  preferred_name: string | null
  /**
   * Email address for the member.
   */
  email: string | null
  /**
   * Date of birth of the member.
   */
  date_of_birth: string | null
  /**
   * The IANA time zone identifier of the member, if one is known. If no time zone is
   * known, null is returned.
   */
  time_zone: string | null
  /**
   * Sex assigned and recorded on the birth certificate at the time of the
   * individual's birth. This information is often clinically useful, but is not
   * necessarily indicative of the individual's gender identity.
   */
  sex_at_birth: MemberSexAtBirth | null
  /**
   * The gender of a person used for administrative purposes, such as on
   * government-issued ID documents.
   */
  administrative_gender: MemberAdministrativeGender | null
  /**
   * The individual member's identification of gender. Note that receiving a null
   * value for gender is not the same as an undisclosed gender. The latter means that
   * the user specifically opted to not disclose a gender. The former indicates that
   * the gender is unknown and/or was not provided.
   */
  gender_identity: MemberGenderIdentity | null
  /**
   * Describes how the person would like to be referred to when not using their name.
   */
  pronouns: MemberPronouns | null
  /**
   * Primary address for the member. If you provide an address, you must specify at
   * least the country and region.
   */
  address: MemberAddress | null
  /**
   * An array of phone numbers associated with the member
   */
  phone_numbers: Array<MemberPhoneNumber>
  /**
   * The care team that is assigned to this member.
   */
  care_team: Expandable<CareTeam>
  /**
   * The file for the member's profile image.
   */
  profile_image: Expandable<File> | null
  /**
   * Licensing region the member is located within.       This is represented as an
   * ISO-3166-2:US code and always matches the region of the member's address.
   */
  license_region: string | null
  /**
   * List of tags attached to this member.
   */
  tags: Array<Expandable<Tag>>
  /**
   * Current status of the member's enrollment in receiving care services. By
   * default, newly created members are in the `enrolled` status. If a member is not
   * actively receiving care, use the `not_enrolled` status.
   *
   * When viewing a member with `access_level = 'limited'`, the value of
   * `enrollment_status` will be `redacted`. This is not valid as an input.
   */
  enrollment_status: MemberEnrollmentStatus
  /**
   * Indicates whether any of the member's information has been redacted for security
   * reasons. Possible values are: full - all member fields that are populated in
   * Source have been returned, for example a member viewing themselves, or a care
   * team or API key retrieving a member within their account; or limited - only some
   * very basic identifying information such as name and profile image has been
   * returned, for example a caregiver who can see another caregiver participating in
   * message threads for a member they are both related to, even when the caregivers
   * are not directly related.
   */
  access_level: MemberAccessLevel
  /**
   * An array of external identifiers for the member. Each identifier is associated
   * with a particular external integration. The member's external identifier must be
   * unique for a given integration.
   */
  external_identifiers: Array<MemberExternalIdentifier>
  /**
   * Custom fields associated with the user. Custom fields must be registered with
   * the Fields API before they can be used on resources, such as a member.
   *
   * Once you've created a custom field, its value will be returned on the related
   * member. You may also use custom fields when filtering members, using the List
   * all Members endpoint.
   */
  custom_fields: Record<string, unknown>
  /**
   * Timestamp of when the member was created.
   */
  created_at: string
  /**
   * Timestamp of when the member was last updated.
   */
  updated_at: string
}

export type MemberSexAtBirth = 'male' | 'female' | 'other' | 'undisclosed'
export type MemberAdministrativeGender = 'male' | 'female' | 'other'

export interface MemberGenderIdentity {
  /**
   * Coded value
   */
  value: MemberGenderIdentityValue
  /**
   * Human-readable display text of coded value, or member-provided string when value
   * is 'other'
   */
  text: string
}

export type MemberGenderIdentityValue =
  | 'female'
  | 'male'
  | 'non_binary'
  | 'other'
  | 'transgender_female'
  | 'transgender_male'
  | 'undisclosed'

export interface MemberPronouns {
  /**
   * Coded value or 'other'
   */
  value: MemberPronounsValue
  /**
   * Human-readable display text of coded value, or member-provided string when value
   * is 'other'
   */
  text: string
}

export type MemberPronounsValue = 'she_her' | 'he_him' | 'they_them' | 'other'

export interface MemberAddress {
  /**
   * The first line of the street address.
   */
  street_line_1: string | null
  /**
   * The second line of the street address.
   */
  street_line_2: string | null
  /**
   * The city.
   */
  city: string | null
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code: string | null
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export interface MemberPhoneNumber {
  /**
   * Type of phone number.
   */
  use: MemberPhoneNumberUse
  /**
   * The phone number to use. This should be formatted in E.164 format.
   */
  value: string
}

export type MemberPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'
export type MemberEnrollmentStatus = 'enrolled' | 'not_enrolled' | 'redacted'
export type MemberAccessLevel = 'full' | 'limited'

export interface MemberExternalIdentifier {
  /**
   * Expandable reference to an Integration
   */
  integration: Expandable<Integration>
  /**
   * The unique identifier of the member in the integrated system.
   */
  external_id: string
}

export interface MemberListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Member>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface MemberListParams {
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
  sort?: MemberListParamsSort
  /**
   * Limit results to members tagged with the provided tag. You may provide either
   * tag IDs or tag names for previously created tags. If multiple tags are provided,
   * searches for members containing any of the provided tags.
   */
  tag?: Array<string>
  /**
   * Limit results to members with the specified email. If multiple emails are
   * provided, members who have any of the emails are returned.
   */
  email?: Array<string>
  /**
   * Filter results to members who have a specified user on their care team. Users
   * must be provided as a list of user identifiers. If multiple users are provided,
   * members who have any of the specified users on their care team are returned.
   */
  care_team?: Array<string>
  /**
   * Filter results to members who have a specified enrollment status.
   */
  enrollment_status?: Array<MemberListParamsEnrollmentStatus>
  /**
   * Filter results to members whose addresses match the specified region. In the US
   * this should be the two-letter state code. If multiple regions are provided,
   * members who are located in any of the specified regions are returned.
   */
  region?: Array<string>
  /**
   * Filter results to members who have a specified sex at birth. If multiple sexes
   * at birth are provided, members who have any of those specified are returned.
   */
  sex_at_birth?: Array<MemberListParamsSexAtBirth>
  /**
   * Filter results to members who have a specified gender identity. You must specify
   * the `gender_identity.value`. If multiple gender identities are provided, members
   * who have any of those specified are returned.
   */
  gender_identity?: Array<MemberListParamsGenderIdentity>
}

export type MemberListParamsSort =
  | 'created_at'
  | 'name'
  | 'date_of_birth'
  | '-created_at'
  | '-name'
  | '-date_of_birth'
export type MemberListParamsEnrollmentStatus = 'enrolled' | 'not_enrolled'
export type MemberListParamsSexAtBirth = 'male' | 'female' | 'other' | 'undisclosed'
export type MemberListParamsGenderIdentity =
  | 'female'
  | 'male'
  | 'non_binary'
  | 'other'
  | 'transgender_female'
  | 'transgender_male'
  | 'undisclosed'

export interface MemberCreateParams {
  /**
   * Title for the member (Mr., Mrs., Dr., etc).
   */
  title?: string | null
  /**
   * First name of the member
   */
  first_name: string
  /**
   * Middle name of the member
   */
  middle_name?: string | null
  /**
   * Last name of the member
   */
  last_name: string
  /**
   * Preferred name of the member. This could be a shortened or alternate name that
   * the member typically prefers to be called.
   */
  preferred_name?: string | null
  /**
   * The IANA time zone identifier of the member. Source uses this time zone when
   * booking appointments on behalf of a member, and will use the time zone
   * information when formatting email notifications to members.
   */
  time_zone?: string | null
  /**
   * Email address for the member
   */
  email?: string | null
  /**
   * Date of birth of the member. Required when enrollment_status is `enrolled`.
   */
  date_of_birth?: string | null
  /**
   * Sex assigned and recorded on the birth certificate at the time of the
   * individual's birth. This information is often clinically useful, but is not
   * necessarily indicative of the individual's gender identity. Required if
   * enrollment_status is `enrolled`.
   */
  sex_at_birth?: MemberCreateParamsSexAtBirth | null
  /**
   * The gender of a person used for administrative purposes, such as on
   * government-issued ID documents.
   */
  administrative_gender?: MemberCreateParamsAdministrativeGender | null
  /**
   * The individual member's identification of gender. Note that receiving a null
   * value for gender is not the same as an undisclosed gender. The latter means that
   * the user specifically opted to not disclose a gender. The former indicates that
   * the gender is unknown and/or was not provided.
   */
  gender_identity?: MemberCreateParamsGenderIdentity | null
  /**
   * Describes how the person would like to be referred to when not using their name.
   */
  pronouns?: MemberCreateParamsPronouns | null
  /**
   * Primary address for the member. If you provide an address, you must specify at
   * least the country and region.
   */
  address?: MemberCreateParamsAddress | null
  /**
   * List of phone numbers associated with the member. Providing any value overrides
   * the entire list. Providing null or an empty list empties out the list of phone
   * numbers.
   */
  phone_numbers?: Array<MemberCreateParamsPhoneNumber> | null
  /**
   * List of tags to apply to the member. You may provide either tag IDs or tag names
   * for previously created tags. Providing tags input replaces any existing tags on
   * the member. Providing null or an empty list empties out the list of tags.
   */
  tags?: Array<string>
  /**
   * The file for the member's profile image. Must be of type `photo`
   */
  profile_image?: string | null
  /**
   * Current status of the member's enrollment in receiving care services. By
   * default, newly created members are in the `enrolled` status. If a member is not
   * actively receiving care, use the `not_enrolled` status.
   *
   * When viewing a member with `access_level = 'limited'`, the value of
   * `enrollment_status` will be `redacted`. This is not valid as an input.
   */
  enrollment_status?: MemberCreateParamsEnrollmentStatus
  /**
   * An array of external identifiers for the member. Each identifier is associated
   * with a particular external integration. The member's external identifier must be
   * unique for a given integration.
   */
  external_identifiers?: Array<MemberCreateParamsExternalIdentifier>
  /**
   * Custom fields associated with the user. Custom fields must be registered with
   * the Fields API before they can be used on resources, such as a member.
   *
   * Once you've created a custom field, its value will be returned on the related
   * member. You may also use custom fields when filtering members, using the List
   * all Members endpoint.
   */
  custom_fields?: Record<string, unknown>
}

export type MemberCreateParamsSexAtBirth = 'male' | 'female' | 'other' | 'undisclosed'
export type MemberCreateParamsAdministrativeGender = 'male' | 'female' | 'other'

export interface MemberCreateParamsGenderIdentity {
  /**
   * Coded value, or 'other'.
   */
  value: MemberCreateParamsGenderIdentityValue
  /**
   * Member-provided string when value is 'other'.
   */
  text?: string | null
}

export type MemberCreateParamsGenderIdentityValue =
  | 'female'
  | 'male'
  | 'non_binary'
  | 'other'
  | 'transgender_female'
  | 'transgender_male'
  | 'undisclosed'

export interface MemberCreateParamsPronouns {
  /**
   * Coded value, or 'other'.
   */
  value: MemberCreateParamsPronounsValue
  /**
   * Member-provided string when value is 'other'.
   */
  text?: string | null
}

export type MemberCreateParamsPronounsValue = 'she_her' | 'he_him' | 'they_them' | 'other'

export interface MemberCreateParamsAddress {
  /**
   * The first line of the street address.
   */
  street_line_1?: string | null
  /**
   * The second line of the street address.
   */
  street_line_2?: string | null
  /**
   * The city.
   */
  city?: string | null
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code?: string | null
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export interface MemberCreateParamsPhoneNumber {
  /**
   * Type of phone number.
   */
  use: MemberCreateParamsPhoneNumberUse
  /**
   * The phone number to use. This should be formatted in E.164 format.
   */
  value: string
}

export type MemberCreateParamsPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'
export type MemberCreateParamsEnrollmentStatus = 'enrolled' | 'not_enrolled'

export interface MemberCreateParamsExternalIdentifier {
  integration: string
  /**
   * The unique identifier of the member in the integrated system.
   */
  external_id: string
}

export interface MemberUpdateParams {
  /**
   * Title for the member (Mr., Mrs., Dr., etc).
   */
  title?: string | null
  /**
   * First name of the member
   */
  first_name?: string
  /**
   * Middle name of the member
   */
  middle_name?: string | null
  /**
   * Last name of the member
   */
  last_name?: string
  /**
   * Preferred name of the member. This could be a shortened or alternate name that
   * the member typically prefers to be called.
   */
  preferred_name?: string | null
  /**
   * The IANA time zone identifier of the member. Source uses this time zone when
   * booking appointments on behalf of a member, and will use the time zone
   * information when formatting email notifications to members.
   */
  time_zone?: string | null
  /**
   * Email address for the member
   */
  email?: string | null
  /**
   * Date of birth of the member. Required when enrollment_status is `enrolled`.
   */
  date_of_birth?: string | null
  /**
   * Sex assigned and recorded on the birth certificate at the time of the
   * individual's birth. This information is often clinically useful, but is not
   * necessarily indicative of the individual's gender identity. Required if
   * enrollment_status is `enrolled`.
   */
  sex_at_birth?: MemberUpdateParamsSexAtBirth | null
  /**
   * The gender of a person used for administrative purposes, such as on
   * government-issued ID documents.
   */
  administrative_gender?: MemberUpdateParamsAdministrativeGender | null
  /**
   * The individual member's identification of gender. Note that receiving a null
   * value for gender is not the same as an undisclosed gender. The latter means that
   * the user specifically opted to not disclose a gender. The former indicates that
   * the gender is unknown and/or was not provided.
   */
  gender_identity?: MemberUpdateParamsGenderIdentity | null
  /**
   * Describes how the person would like to be referred to when not using their name.
   */
  pronouns?: MemberUpdateParamsPronouns | null
  /**
   * Primary address for the member. If you provide an address, you must specify at
   * least the country and region.
   */
  address?: MemberUpdateParamsAddress | null
  /**
   * List of phone numbers associated with the member. Providing any value overrides
   * the entire list. Providing null or an empty list empties out the list of phone
   * numbers.
   */
  phone_numbers?: Array<MemberUpdateParamsPhoneNumber> | null
  /**
   * List of tags to apply to the member. You may provide either tag IDs or tag names
   * for previously created tags. Providing tags input replaces any existing tags on
   * the member. Providing null or an empty list empties out the list of tags.
   */
  tags?: Array<string>
  /**
   * The file for the member's profile image. Must be of type `photo`
   */
  profile_image?: string | null
  /**
   * Current status of the member's enrollment in receiving care services. By
   * default, newly created members are in the `enrolled` status. If a member is not
   * actively receiving care, use the `not_enrolled` status.
   *
   * When viewing a member with `access_level = 'limited'`, the value of
   * `enrollment_status` will be `redacted`. This is not valid as an input.
   */
  enrollment_status?: MemberUpdateParamsEnrollmentStatus
  /**
   * An array of external identifiers for the member. Each identifier is associated
   * with a particular external integration. The member's external identifier must be
   * unique for a given integration.
   */
  external_identifiers?: Array<MemberUpdateParamsExternalIdentifier>
  /**
   * Custom fields associated with the user. Custom fields must be registered with
   * the Fields API before they can be used on resources, such as a member.
   *
   * Once you've created a custom field, its value will be returned on the related
   * member. You may also use custom fields when filtering members, using the List
   * all Members endpoint.
   */
  custom_fields?: Record<string, unknown>
}

export type MemberUpdateParamsSexAtBirth = 'male' | 'female' | 'other' | 'undisclosed'
export type MemberUpdateParamsAdministrativeGender = 'male' | 'female' | 'other'

export interface MemberUpdateParamsGenderIdentity {
  /**
   * Coded value, or 'other'.
   */
  value: MemberUpdateParamsGenderIdentityValue
  /**
   * Member-provided string when value is 'other'.
   */
  text?: string | null
}

export type MemberUpdateParamsGenderIdentityValue =
  | 'female'
  | 'male'
  | 'non_binary'
  | 'other'
  | 'transgender_female'
  | 'transgender_male'
  | 'undisclosed'

export interface MemberUpdateParamsPronouns {
  /**
   * Coded value, or 'other'.
   */
  value: MemberUpdateParamsPronounsValue
  /**
   * Member-provided string when value is 'other'.
   */
  text?: string | null
}

export type MemberUpdateParamsPronounsValue = 'she_her' | 'he_him' | 'they_them' | 'other'

export interface MemberUpdateParamsAddress {
  /**
   * The first line of the street address.
   */
  street_line_1?: string | null
  /**
   * The second line of the street address.
   */
  street_line_2?: string | null
  /**
   * The city.
   */
  city?: string | null
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code?: string | null
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export interface MemberUpdateParamsPhoneNumber {
  /**
   * Type of phone number.
   */
  use: MemberUpdateParamsPhoneNumberUse
  /**
   * The phone number to use. This should be formatted in E.164 format.
   */
  value: string
}

export type MemberUpdateParamsPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'
export type MemberUpdateParamsEnrollmentStatus = 'enrolled' | 'not_enrolled'

export interface MemberUpdateParamsExternalIdentifier {
  integration: string
  /**
   * The unique identifier of the member in the integrated system.
   */
  external_id: string
}

export class MemberResource extends Resource {
  /**
   * Returns a list of members within the current account.
   *
   * The members returned are sorted by creation date, with the most recently added
   * members appearing first.
   */
  public list(
    params?: MemberListParams,
    options?: SourceRequestOptions,
  ): Promise<MemberListResponse> {
    return this.source.request('GET', '/v1/members', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new member and registers them with Source.
   */
  public create(params: MemberCreateParams, options?: SourceRequestOptions): Promise<Member> {
    return this.source.request('POST', '/v1/members', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing member. You need only supply the unique
   * member identifier that was returned upon member creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Member> {
    return this.source.request('GET', `/v1/members/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified member by setting the values of the parameters passed.
   *
   * Any parameters not provided will be left unchanged. For example, if you pass the
   * email parameter, that becomes the member's active email to be used.
   */
  public update(
    id: string,
    params?: MemberUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Member> {
    return this.source.request('POST', `/v1/members/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified member. Members that have meaningful objects associated
   * with them, such as tasks, threads, or documents, may not be deleted.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Member> {
    return this.source.request('DELETE', `/v1/members/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
