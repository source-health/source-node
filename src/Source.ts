import { SignJWT } from 'jose/jwt/sign' // eslint-disable-line

import { SourceClient } from './SourceClient'
import { ApiKey, Authentication } from './authentication'
import { HttpClient, createClientForEnvironment } from './http'
import { RootResources, allResources } from './resources'

interface TokenOptions {
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

  // Used to encode secrets for JWT signing
  private readonly encoder = new TextEncoder()

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

  /**
   * Generates a JWT suitable to allow a member to access the API
   *
   * @param options options for configuring the generated token
   * @returns a generated token that allows a member access to the API
   */
  public async generateToken(options: TokenOptions): Promise<string> {
    if (!(this.authentication instanceof ApiKey)) {
      throw new Error('You may only generate tokens when using API key authentication')
    }

    const signJWT = new SignJWT({
      sub: options.member,
      iat: Math.floor(Date.now() / 1_000),
      exp: Math.floor(options.expiration.getTime() / 1_000),
      scopes: options.scopes ?? [],
    })

    return await signJWT
      .setProtectedHeader({ alg: 'HS256', kid: this.authentication.id })
      .sign(this.encoder.encode(this.authentication.secret))
  }
}

export interface Source extends RootResources { } // eslint-disable-line