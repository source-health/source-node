import { SourceClient } from './SourceClient'
import { TokenGenerator } from './TokenGenerator'
import { Authentication } from './authentication'
import { HttpClient, createClientForEnvironment } from './http'
import { RootResources, allResources } from './resources'

export interface SourceOptions {
  /**
   * Client instance to use (if one is not provided, it will be created)
   */
  readonly client?: HttpClient
  /**
   * Timeout (in ms) to apply to all requests
   */
  readonly timeout?: number
  /**
   * Base URL to which requests should be sent
   */
  readonly baseUrl?: string
  /**
   * List of properties to expand
   */
  readonly expand?: string[]
}

export class Source {
  // Use to make calls to the Source API
  private readonly client: SourceClient

  // Used to generate member JWTs
  public readonly tokens = new TokenGenerator(this.authentication)

  constructor(
    private readonly authentication: Authentication,
    private readonly options: SourceOptions = {},
  ) {
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