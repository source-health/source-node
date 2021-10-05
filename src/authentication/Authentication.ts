export interface Authentication {
  /**
   * Returns the headers necessary to authenticate the given request
   *
   * @returns a dictionary of headers to apply to the request
   */
  createHeaders(): Record<string, string>
}
