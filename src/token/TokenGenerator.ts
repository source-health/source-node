export interface TokenOptions {
  /**
   * The 'subject' member ID - i.e. the member who this token will act on. Note - this is actually a required field
   * unless the deprecated `member` param is set instead.
   */
  subject?: string

  /**
   * The 'actor' member ID - optional, the authorized member ID when using the Source Relationsips API to grant access
   * to authorized members as a caregiver to another member.
   */
  actor?: string

  /**
   * Deprecated alias for the 'subject' field. Supplying `member` in addition to `subject` and/or `actor` will be
   * rejected at run-time, to prevent ambiguity.
   */
  member?: string

  /**
   * Expiration time for the token. Must be no more than 24 hours from now.
   */
  expiration: Date

  /**
   * Scopes to apply to the token which may limit its access
   */
  scopes?: string[]
}

export interface TokenGenerator {
  /**
   * Generates a member token
   *
   * @param options options to pass down to the generator
   */
  generate(options: TokenOptions): Promise<string>
}
