export interface RecurringSlot {
  /**
   * Always `recurring_slot`.
   */
  object: 'recurring_slot'
  instances: Array<RecurringSlotInstance>
}

export interface RecurringSlotInstance {
  /**
   * The start time of this recurring appointment slot.
   */
  start_at: string
  /**
   * The end time of this recurring appointment slot.
   */
  end_at: string
  /**
   * The reasons, if any, why one or more of the requested participants cannot be
   * booked for this recurring appointment slot, provided as an array of conflict
   * reasons per participant. When empty, all particpants have scheduled availability
   * for this slot and none have conflicting appointments.
   */
  conflicts: Array<RecurringSlotInstanceConflict>
}

export interface RecurringSlotInstanceConflict {
  resource: RecurringSlotInstanceConflictResource
  reasons: Array<RecurringSlotInstanceConflictReason>
}

export type RecurringSlotInstanceConflictResource = string
export type RecurringSlotInstanceConflictReason =
  | 'existing_appointment'
  | 'participant_unavailable'
  | 'location_unavailable'
