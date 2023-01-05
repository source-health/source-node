import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { File } from './File'
import { Expandable } from './shared'

export interface Location {
  /**
   * Always `location`.
   */
  object: 'location'
  /**
   * Unique ID for the location.
   */
  id: string
  /**
   * Unique name for this location.
   */
  name: string
  /**
   * Whether the location is a physical location, or a virtual one. There is always
   * one and only one virtual location for each Source account. You may have any
   * number of physical locations, however.
   */
  type: LocationType
  /**
   * Free text description for this location. This might be used to include
   * information about this location, the services that are offered here, or
   * exceptions to operating hours.
   */
  description: string | null
  /**
   * Free text directions for accessing this location. Typically, this is used to
   * store information that is broadly applicable, such as "take exit 45 off of
   * I-485, and turn right on Front Street." You may also use it to provide more
   * specific building level access information, such as "enter through the north
   * lobby, pass the security desk and take the elevator to the 3rd floor."
   */
  directions: string | null
  /**
   * The physical address of the location. Only provided when the location type is
   * "physical."
   */
  address: LocationAddress | null
  /**
   * Image associated with the physical location. Must be a file of type
   * `location_photo`. Images are optional, but can be helpful for patients to
   * identify the location.
   */
  image: Expandable<File> | null
  /**
   * An array of phone numbers associated with the location.
   */
  phone_numbers: Array<LocationPhoneNumber>
  /**
   * The latitude/longitude pair for this location, if it's a physical location.
   * Source attempts to geocode all physical locations at the time of creation.
   */
  coordinates: Array<number> | null
  /**
   * The time zone in which this location operates. It is used whenever Source needs
   * to determine the local time for a location.
   */
  time_zone: string
  /**
   * When searching locations nearby a coordinate, this field will contain the
   * distance (in km) between the location and provided coordinate. This field will
   * only be present when a geo-searching request is issued via the List all
   * Locations endpoint.
   */
  distance?: number
  /**
   * Timestamp when the location was created.
   */
  created_at: string
  /**
   * Timestamp when the location was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the location was deleted, which is only present for deleted
   * locations. Deleted locations are not typically returned by the API, however they
   * are returned in `location.deleted` events and expanded references on other
   * objects.
   */
  deleted_at?: string
}

export type LocationType = 'physical' | 'virtual'

export interface LocationAddress {
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

export interface LocationPhoneNumber {
  /**
   * Type of phone number.
   */
  use: LocationPhoneNumberUse
  /**
   * The phone number to use. This should be formatted in E.164 format.
   */
  value: string
}

export type LocationPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface LocationUpdateParams {
  /**
   * Unique, friendly name for this location.
   */
  name?: string
  /**
   * Free text description for this location. This might be used to include
   * information about this location, the services that are offered here, or
   * exceptions to operating hours.
   */
  description?: string | null
  /**
   * Free text directions for accessing this location. Typically, this is used to
   * store information that is broadly applicable, such as "take exit 45 off of
   * I-485, and turn right on Front Street." You may also use it to provide more
   * specific building level access information, such as "enter through the north
   * lobby, pass the security desk and take the elevator to the 3rd floor."
   */
  directions?: string | null
  /**
   * Image associated with the physical location. Must be a file of type
   * `location_photo`. Images are optional, but can be helpful for patients to
   * identify the location.
   */
  image?: string | null
  /**
   * The physical coordinates (expressed as a pair of [longitude, latitude]) for this
   * physical location. Source attempts to geocode addresses and set coordinates
   * automatically when creating locations. However, in some cases, such as when
   * opening an office in new construction, geolocation may not succeed. If this
   * occurs, you may manually specify coordinates to override our geolocation.
   */
  coordinates?: Array<number>
  phone_numbers?: Array<LocationUpdateParamsPhoneNumber> | null
  /**
   * The physical address for this location. Note that added locations must have a
   * physical address, which Source must be able to geocode.
   */
  address?: LocationUpdateParamsAddress
  /**
   * The time zone in which this location operates. It is used whenever Source need
   * to determine the local time for a location.
   *
   * If no time zone is provided, Source will attempt to automatically determine a
   * time zone based on the physical location's address.
   */
  time_zone?: string
}

export interface LocationUpdateParamsPhoneNumber {
  /**
   * Type of phone number.
   */
  use: LocationUpdateParamsPhoneNumberUse
  /**
   * The phone number to use. This should be formatted in E.164 format.
   */
  value: string
}

export type LocationUpdateParamsPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface LocationUpdateParamsAddress {
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

export interface LocationListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Location>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface LocationListParams {
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
  sort?: LocationListParamsSort
  /**
   * Limit results to locations of the provided type.
   */
  type?: LocationListParamsType
  /**
   * Limit results to locations with name containing the given query.
   */
  name?: string
  /**
   * Filter for locations that are within a specified distance of the provided
   * location. The value provided here can be a postal code, city/state combination,
   * or a fully specified address. If you have coordinates, such as from a GPS
   * device, you may also provide a coordinate pair as a comma-separated string,
   * providing the longitude first, and then the latitude.
   *
   * When this filter is applied, the default sorting mechanism will automatically
   * switch to "distance" unless an explicit sort option is provided.
   */
  nearby?: string
  /**
   * When using geo-search, this limits the locations that will be shown to only
   * those that are within the provided number of miles of the target location.
   */
  distance?: number
}

export type LocationListParamsSort =
  | 'created_at'
  | 'name'
  | 'distance'
  | '-created_at'
  | '-name'
  | '-distance'
export type LocationListParamsType = 'physical' | 'virtual'

export interface LocationCreateParams {
  /**
   * Unique, friendly name for this location.
   */
  name: string
  /**
   * Free text description for this location. This might be used to include
   * information about this location, the services that are offered here, or
   * exceptions to operating hours.
   */
  description?: string | null
  /**
   * Free text directions for accessing this location. Typically, this is used to
   * store information that is broadly applicable, such as "take exit 45 off of
   * I-485, and turn right on Front Street." You may also use it to provide more
   * specific building level access information, such as "enter through the north
   * lobby, pass the security desk and take the elevator to the 3rd floor."
   */
  directions?: string | null
  /**
   * Image associated with the physical location. Must be a file of type
   * `location_photo`. Images are optional, but can be helpful for patients to
   * identify the location.
   */
  image?: string | null
  /**
   * The physical coordinates (expressed as a pair of [longitude, latitude]) for this
   * physical location. Source attempts to geocode addresses and set coordinates
   * automatically when creating locations. However, in some cases, such as when
   * opening an office in new construction, geolocation may not succeed. If this
   * occurs, you may manually specify coordinates to override our geolocation.
   */
  coordinates?: Array<number>
  phone_numbers?: Array<LocationCreateParamsPhoneNumber> | null
  /**
   * The physical address for this location. Note that added locations must have a
   * physical address, which Source must be able to geocode.
   */
  address: LocationCreateParamsAddress
  /**
   * The time zone in which this location operates. It is used whenever Source need
   * to determine the local time for a location.
   *
   * If no time zone is provided, Source will attempt to automatically determine a
   * time zone based on the physical location's address.
   */
  time_zone?: string
}

export interface LocationCreateParamsPhoneNumber {
  /**
   * Type of phone number.
   */
  use: LocationCreateParamsPhoneNumberUse
  /**
   * The phone number to use. This should be formatted in E.164 format.
   */
  value: string
}

export type LocationCreateParamsPhoneNumberUse = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface LocationCreateParamsAddress {
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

export class LocationResource extends Resource {
  /**
   * Retrieves the details of an existing location. You need only supply the unique
   * location identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Location> {
    return this.source.request('GET', `/v1/locations/${id}`, {
      options,
    })
  }

  /**
   * Updates an existing location by its unique identifier.
   */
  public update(
    id: string,
    params?: LocationUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Location> {
    return this.source.request('POST', `/v1/locations/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes a location by its unique identifier.
   *
   * Once a location is deleted, it can no longer be used for searching availability
   * or booking appointments. Existing appointments which already exist at the
   * location will remain unaffected.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Location> {
    return this.source.request('DELETE', `/v1/locations/${id}`, {
      contentType: 'json',
      options,
    })
  }

  /**
   * Returns a list of locations within the current account.
   *
   * The locations returned are sorted by creation date, with the most recently added
   * location appearing first.
   */
  public list(
    params?: LocationListParams,
    options?: SourceRequestOptions,
  ): Promise<LocationListResponse> {
    return this.source.request('GET', '/v1/locations', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new location where services are offered.
   *
   * You may add any number of locations at which services are offered. Each account
   * is currently limited to one virtual location, which contains information and
   * practice-wide availability schedules for your virtual visits.
   */
  public create(params: LocationCreateParams, options?: SourceRequestOptions): Promise<Location> {
    return this.source.request('POST', '/v1/locations', {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
