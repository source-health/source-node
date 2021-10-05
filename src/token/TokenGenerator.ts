export interface TokenOptions {
  /**
   * Member for which this token should be generated
   */
  member: string

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
