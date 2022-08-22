export interface ApiKey {
  /**
   * Always `api_key`.
   */
  object: 'api_key'
  /**
   * Unique ID of the key.
   */
  id: string
  /**
   * Display name for this API Key.
   */
  name: string | null
  /**
   * The API key secret, which is only returned when setting `reveal=true` on the
   * request.
   */
  secret: string
  /**
   * Identifies that this is the primary key for the account
   */
  primary: boolean
  /**
   * Timestamp when the key was created.
   */
  created_at: string
}
