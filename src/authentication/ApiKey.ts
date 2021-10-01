import { Authentication } from './Authentication'

export class ApiKey implements Authentication {
  /**
   * Creates a new API Key Authorization
   *
   * API keys can be used for server-to-server authentication to the Catalyst API. When
   * using this authentication method, a Bearer token is applied to each outgoing request.
   *
   * @param key the API key secret to send on outgoing requests
   */
  constructor(private readonly key: string) {}

  /**
   * Attaches an Authorization header
   *
   * @returns the headers for the request
   */
  public createHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.key}`,
    }
  }
}