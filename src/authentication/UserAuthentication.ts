import { Authentication } from './Authentication'

export class UserAuthentication implements Authentication {
  /**
   * Creates a new User Key authorization
   *
   * This authentication type can be used when there is a valid session on the Source UI. It should not
   * be used by third party developers, generally.
   *
   * @param secret the user secreet
   * @param liveMode whether or not to use live mode
   */
  constructor(public readonly secret: string, public readonly liveMode: boolean = true) {}

  /**
   * Attaches an Authorization header
   *
   * @returns the headers for the request
   */
  public createHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.secret}`,
      'Source-Live-Mode': this.liveMode ? 'true' : 'false',
    }
  }
}
