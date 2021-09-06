import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Memberaddress {
  
  /**
   * The first line of the street address.
   */
  readonly street_line_1: string
  
  /**
   * The second line of the street address.
   */
  readonly street_line_2: string
  
  /**
   * The city.
   */
  readonly city: string
  
  /**
   * The region - in the US this should be the two-letter state code.
   */
  readonly region: string
  
  /**
   * The postal code (i.e. zip code).
   */
  readonly postal_code: string
  
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country at this time.
   */
  readonly country: string
}

interface Member {
  
  /**
   * Always `member`.
   */
  readonly object: string
  
  /**
   * Unique ID of the member.
   */
  readonly id: string
  
  /**
   * Title for the member (Mr., Mrs., Dr., etc).
   */
  readonly title: string
  
  /**
   * First name of the member.
   */
  readonly first_name: string
  
  /**
   * Middle name of the member.
   */
  readonly middle_name: string
  
  /**
   * Last name of the member.
   */
  readonly last_name: string
  
  /**
   * Email address for the member.
   */
  readonly email: string
  
  /**
   * Date of birth of the member.
   */
  readonly date_of_birth: string
  
  /**
   * Biological sex of the member
   */
  readonly biological_sex: string
  
  /**
   * Default address for the member. Used if no address is provided on a specific order.
   */
  readonly address: Memberaddress
  
  /**
   * Timestamp of when the member was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp of when the member was last updated.
   */
  readonly updated_at: string
}

interface ListAllMembersParams {
  
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
   * Limit results to members with the given email.
   */
  readonly email?: string
}

interface ListAllMembersResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Member>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateAMemberParamsaddress {
  
  /**
   * The first line of the street address.
   */
  readonly street_line_1: string
  
  /**
   * The second line of the street address.
   */
  readonly street_line_2?: string
  
  /**
   * The city.
   */
  readonly city: string
  
  /**
   * The region - in the US this should be the two-letter state code.
   */
  readonly region: string
  
  /**
   * The postal code (i.e. zip code).
   */
  readonly postal_code: string
  
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country at this time.
   */
  readonly country: string
}

interface CreateAMemberParams {
  
  /**
   * Title for the member (Mr., Mrs., Dr., etc).
   */
  readonly title?: string
  
  /**
   * First name of the member
   */
  readonly first_name: string
  
  /**
   * Middle name of the member
   */
  readonly middle_name?: string
  
  /**
   * Last name of the member
   */
  readonly last_name: string
  
  /**
   * Email address for the member
   */
  readonly email?: string
  
  /**
   * Date of birth of the member
   */
  readonly date_of_birth: string
  
  /**
   * Biological sex of the member
   */
  readonly biological_sex: string
  
  /**
   * Default address for the member. Used if no address is provided on a specific order.
   */
  readonly address?: CreateAMemberParamsaddress
}

interface UpdateAMemberParamsaddress {
  
  /**
   * The first line of the street address.
   */
  readonly street_line_1: string
  
  /**
   * The second line of the street address.
   */
  readonly street_line_2?: string
  
  /**
   * The city.
   */
  readonly city: string
  
  /**
   * The region - in the US this should be the two-letter state code.
   */
  readonly region: string
  
  /**
   * The postal code (i.e. zip code).
   */
  readonly postal_code: string
  
  /**
   * The country, as a two-letter ISO 3166-1 code. US is the only supported country at this time.
   */
  readonly country: string
}

interface UpdateAMemberParams {
  
  /**
   * Title for the member (Mr., Mrs., Dr., etc).
   */
  readonly title?: string
  
  /**
   * First name of the member
   */
  readonly first_name?: string
  
  /**
   * Middle name of the member
   */
  readonly middle_name?: string
  
  /**
   * Last name of the member
   */
  readonly last_name?: string
  
  /**
   * Email address for the member
   */
  readonly email?: string
  
  /**
   * Date of birth of the member
   */
  readonly date_of_birth?: string
  
  /**
   * Biological sex of the member
   */
  readonly biological_sex?: string
  
  /**
   * Default address for the member. Used if no address is provided on a specific order.
   */
  readonly address?: UpdateAMemberParamsaddress
}


export class MemberContext extends BaseContext {
  
  /**
   * Returns a list of members within the current account.
   * 
   * The members returned are sorted by creation date, with the most recently added members appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllMembersParams, options?: CatalystOptions): Promise<ListAllMembersResponse> {
    return this.catalyst.request("GET", `/v1/members`, { 
      params,
      options,
    })
  }
  
  /**
   * Creates a new member and registers them with Catalyst. Members must be created in order to ship devices or track
   * measurements.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateAMemberParams, options?: CatalystOptions): Promise<Member> {
    return this.catalyst.request("POST", `/v1/members`, { 
      params,
      options,
    })
  }
  
  /**
   * Retrieves the details of an existing member. You need only supply the unique member identifier that was returned upon
   * member creation.
   *
   * @param id Unique ID of the member
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Member> {
    return this.catalyst.request("GET", `/v1/members/${id}`, { 
      options,
    })
  }
  
  /**
   * Updates the specified member by setting the values of the parameters passed.
   * 
   * Any parameters not provided will be left unchanged. For example, if you pass the email parameter, that becomes the
   * member's active email to be used.
   *
   * @param id Unique ID of the member
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async update(id: string, params?: UpdateAMemberParams, options?: CatalystOptions): Promise<Member> {
    return this.catalyst.request("POST", `/v1/members/${id}`, { 
      params,
      options,
    })
  }
  
}