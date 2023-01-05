import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { User } from './User'
import { Expandable } from './shared'

export interface License {
  /**
   * Always `license`.
   */
  object: 'license'
  /**
   * Unique ID for the license.
   */
  id: string
  /**
   * User to whom the license belongs.
   */
  user: Expandable<User>
  /**
   * The type of clinical license. If you have a need for a license type that is not
   * supported, please don’t hesitate to reach out to Source.
   */
  type: LicenseType
  /**
   * Region with which the license is associated. This is represented as an
   * ISO-3166-2:US code. For example, "US-NY".
   */
  region: string
  /**
   * The ID or number issued by the licensing body for this license.
   */
  license_number: string | null
  /**
   * Status of the license.
   */
  status: LicenseStatus
  /**
   * Description of the license.
   */
  description: string | null
  /**
   * Timestamp when the license was created.
   */
  created_at: string
  /**
   * Timestamp when the license was last updated.
   */
  updated_at: string
}

export interface LicenseType {
  /**
   * Code for the license type. For example, "MD".
   */
  code: string
  /**
   * Description of the license type. For example, "Doctor of Medcine".
   */
  description: string
}

export type LicenseStatus = 'active' | 'inactive'

export interface LicenseListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<License>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface LicenseListParams {
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
  sort?: LicenseListParamsSort
  /**
   * Filter results by user. If multiple users are provided, licenses matching any of
   * the provided users will be returned.
   */
  user?: Array<string>
  /**
   * Filter results by type. The corresponding code for the license type should be
   * provided. If multiple codes are provided, licenses matching any of the provided
   * license types will be returned.
   */
  type?: Array<string>
  /**
   * Filter results by region. If multiple regions are provided, licenses matching
   * any of the provided regions will be returned.
   */
  region?: Array<string>
  /**
   * Filter results by status. If multiple statuses are provided, licenses matching
   * any of the provided statuses will be returned.
   */
  status?: Array<LicenseListParamsStatus>
}

export type LicenseListParamsSort = 'created_at' | '-created_at'
export type LicenseListParamsStatus = 'active' | 'inactive'

export interface LicenseCreateParams {
  /**
   * User to whom the license belongs.
   */
  user: string
  /**
   * The type of clinical license. If you have a need for a license type that is not
   * supported, please don’t hesitate to reach out to Source.
   */
  type: LicenseCreateParamsType
  /**
   * Region with which the license is associated. This is represented as an
   * ISO-3166-2:US code. For example, "US-NY".
   */
  region: string
  /**
   * The ID or number issued by the licensing body for this license.
   */
  license_number?: string | null
  /**
   * Status of the license.
   */
  status: LicenseCreateParamsStatus
  /**
   * Description of the license.
   */
  description?: string | null
}

export interface LicenseCreateParamsType {
  code: string
}

export type LicenseCreateParamsStatus = 'active' | 'inactive'

export interface LicenseUpdateParams {
  /**
   * The ID or number issued by the licensing body for this license.
   */
  license_number?: string | null
  /**
   * Status of the license.
   */
  status?: LicenseUpdateParamsStatus
  /**
   * Description of the license.
   */
  description?: string | null
}

export type LicenseUpdateParamsStatus = 'active' | 'inactive'

export class LicenseResource extends Resource {
  /**
   * Returns a list of licenses within the current account. The licenses returned are
   * sorted by creation date, with the most recently added license appearing first.
   */
  public list(
    params?: LicenseListParams,
    options?: SourceRequestOptions,
  ): Promise<LicenseListResponse> {
    return this.source.request('GET', '/v1/licenses', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new license for a user.
   */
  public create(params: LicenseCreateParams, options?: SourceRequestOptions): Promise<License> {
    return this.source.request('POST', '/v1/licenses', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing license. You need only supply the unique
   * license identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<License> {
    return this.source.request('GET', `/v1/licenses/${id}`, {
      options,
    })
  }

  /**
   * Updates the license with a new status, license number, or description. To update
   * other license fields, first delete the license and then create a new one.
   */
  public update(
    id: string,
    params?: LicenseUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<License> {
    return this.source.request('POST', `/v1/licenses/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified license.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<License> {
    return this.source.request('DELETE', `/v1/licenses/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
