import { RequestArguments, SourceClient } from './SourceClient'
import { SourceConfiguration, SourceConfigurationOptions } from './SourceConfiguration'
import { HttpAdapter, createClientForEnvironment } from './adapter'
import { Authentication } from './authentication'
import { RootResources, allResources } from './resources'
import { TokenGenerator, createTokenGenerator } from './token'

export interface SourceOptions extends Omit<Partial<SourceConfigurationOptions>, 'authentication'> {
  /**
   * Client instance to use (if one is not provided, it will be created)
   */
  readonly adapter?: HttpAdapter
}

export class Source {
  // Configuration that's used in requests
  public readonly configuration: SourceConfiguration

  // Use to make calls to the Source API
  private readonly client: SourceClient

  // Used to encode secrets for JWT signing
  public readonly tokens: TokenGenerator

  constructor(authentication?: Authentication, options: SourceOptions = {}) {
    const adapter = options.adapter ?? createClientForEnvironment()

    this.configuration = new SourceConfiguration({
      authentication: authentication,
      baseUrl: 'https://api.sourcehealth.com',
      ...options,
    })

    this.tokens = createTokenGenerator(this.configuration)
    this.client = new SourceClient(adapter, this.configuration)

    // Bootstrap all resources and attach them to the client
    Object.assign(this, allResources(this.client))
  }

  /**
   * Executes a request using the underlying client
   *
   * @param method the method to hit on the API
   * @param path the path to hit on the API
   * @param options options/request inputs
   * @returns the API response
   */
  public request<T>(method: string, path: string, options: RequestArguments): Promise<T> {
    return this.client.request(method, path, options)
  }
}

export interface Source extends RootResources {} // eslint-disable-line
