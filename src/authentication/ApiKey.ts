import { Authentication } from './Authentication'

export class ApiKey implements Authentication {
  /**
   * Creates a new API Key Authorization
   *
   * API keys can be used for server-to-server authentication to the Source API. When
   * using this authentication method, a Bearer token is applied to each outgoing request.
   *
   * @param id the API key id
   * @param secret the API key secret to send on outgoing requests
   */
  constructor(public readonly id: string, public readonly secret: string) {}

  /**
   * Attaches an Authorization header
   *
   * @returns the headers for the request
   */
  public createHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.secret}`,
    }
  }
}
