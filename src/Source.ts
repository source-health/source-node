import { SourceClient } from './SourceClient'
// import { TokenGenerator } from './TokenGenerator'
import { HttpAdapter, createClientForEnvironment } from './adapter'
import { ApiKey, Authentication } from './authentication'
import { RootResources, allResources } from './resources'

export interface SourceOptions {
  /**
   * Client instance to use (if one is not provided, it will be created)
   */
  readonly client?: HttpAdapter
  /**
   * Timeout (in ms) to apply to all requests
   */
  readonly timeout?: number
  /**
   * Base URL to which requests should be sent
   */
  readonly baseUrl?: string
}

export class Source {
  // Authentication to pass down to API calls
  private authentication: Authentication

  // Use to make calls to the Source API
  private readonly client: SourceClient

  // Used to encode secrets for JWT signing
  // public readonly tokens: TokenGenerator

  constructor(authentication?: Authentication, options: SourceOptions = {}) {
    let actualAuthentication: Authentication
    if (authentication) {
      actualAuthentication = authentication
    } else {
      actualAuthentication = ApiKey.fromEnvironment()
    }

    this.authentication = actualAuthentication
    // this.tokens = new TokenGenerator(this.authentication)

    this.client = new SourceClient(
      options.client ??
        createClientForEnvironment({
          base: options.baseUrl ?? 'https://api.sourcehealth.com',
          timeout: options.timeout,
        }),
      this.authentication,
    )

    // Bootstrap all resources and attach them to the client
    Object.assign(this, allResources(this.client))
  }
}

export interface Source extends RootResources { } // eslint-disable-line