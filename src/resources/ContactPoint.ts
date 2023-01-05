export interface ContactPoint {
  /**
   * The system that this contact point represents.
   */
  system: ContactPointSystem
  /**
   * The details of the actual contact point, such as the phone number or email
   * address. While this value is always a string, the specific syntax will be
   * determined based on the system.
   */
  value: string
}

export type ContactPointSystem = 'phone' | 'email' | 'other'
