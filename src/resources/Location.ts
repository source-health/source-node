export type LocationType = 'physical' | 'virtual'

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
   * The time zone in which this location operations. It is used whenever we need to
   * determine the local time for a location.
   */
  time_zone: string
  /**
   * Timestamp when the location was created.
   */
  created_at: string
  /**
   * Timestamp when the location was last updated.
   */
  updated_at: string
}
