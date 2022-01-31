import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { CareTeam } from './CareTeam'
import { File } from './File'
import { Expandable } from './shared'

export type MemberBiologicalSex = 'male' | 'female' | 'non_binary' | 'undisclosed'

export interface MemberAddress {
  /**
   * The first line of the street address.
   */
  street_line_1: string
  /**
   * The second line of the street address.
   */
  street_line_2: string | null
  /**
   * The city.
   */
  city: string
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code: string
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export type MemberPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'

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

export interface Member {
  /**
   * Always `member`.
   */
  object: 'member'
  /**
   * Unique ID for the Member.
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
  date_of_birth: string
  /**
   * Biological sex of the member
   */
  biological_sex: MemberBiologicalSex
  /**
   * Default address for the member. Used if no address is provided on a specific
   * order.
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
   * Timestamp of when the member was created.
   */
  created_at: string
  /**
   * Timestamp of when the member was last updated.
   */
  updated_at: string
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
   * Limit results to members with the given email.
   */
  email?: string
}

export type MemberCreateParamsBiologicalSex = 'male' | 'female' | 'non_binary' | 'undisclosed'

export interface MemberCreateParamsAddress {
  /**
   * The first line of the street address.
   */
  street_line_1: string
  /**
   * The second line of the street address.
   */
  street_line_2?: string | null
  /**
   * The city.
   */
  city: string
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code: string
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export type MemberCreateParamsPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'

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
   * Email address for the member
   */
  email?: string | null
  /**
   * Date of birth of the member
   */
  date_of_birth: string
  /**
   * Biological sex of the member
   */
  biological_sex: MemberCreateParamsBiologicalSex
  /**
   * Default address for the member. Used if no address is provided on a specific
   * order.
   */
  address?: MemberCreateParamsAddress | null
  /**
   * An array of phone numbers associated with the member. Providing any value will
   * override the entire array. Providing null or an empty array will empty out the
   * array.
   */
  phone_numbers?: Array<MemberCreateParamsPhoneNumber> | null
  /**
   * The file for the member's profile image. Must be of type `photo`
   */
  profile_image?: string | null
}

export type MemberUpdateParamsBiologicalSex = 'male' | 'female' | 'non_binary' | 'undisclosed'

export interface MemberUpdateParamsAddress {
  /**
   * The first line of the street address.
   */
  street_line_1: string
  /**
   * The second line of the street address.
   */
  street_line_2?: string | null
  /**
   * The city.
   */
  city: string
  /**
   * The region - in the US this should be the two-letter state code.
   */
  region: string
  /**
   * The postal code (i.e. zip code).
   */
  postal_code: string
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country
   * at this time.
   */
  country: string
}

export type MemberUpdateParamsPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'

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
   * Email address for the member
   */
  email?: string | null
  /**
   * Date of birth of the member
   */
  date_of_birth?: string
  /**
   * Biological sex of the member
   */
  biological_sex?: MemberUpdateParamsBiologicalSex
  /**
   * Default address for the member. Used if no address is provided on a specific
   * order.
   */
  address?: MemberUpdateParamsAddress | null
  /**
   * An array of phone numbers associated with the member. Providing any value will
   * override the entire array. Providing null or an empty array will empty out the
   * array.
   */
  phone_numbers?: Array<MemberUpdateParamsPhoneNumber> | null
  /**
   * The file for the member's profile image. Must be of type `photo`
   */
  profile_image?: string | null
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
   * Creates a new member and registers them with Source. Members must be created in
   * order to ship devices or track measurements.
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
   * with them, such as tasks, threads, or files, may not be deleted.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Member> {
    return this.source.request('DELETE', `/v1/members/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
