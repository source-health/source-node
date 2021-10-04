import type { SignJWT } from 'jose/jwt/sign' // eslint-disable-line

import { ApiKey, Authentication } from './authentication'

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

export class TokenGenerator {
  private readonly signConstructor: typeof SignJWT | null
  private readonly encoder = new TextEncoder()

  constructor(private readonly authentication: Authentication) {
    if (process.env.TARGET === 'browser') {
      this.signConstructor = null
    } else {
      this.signConstructor = (require('jose/jwt/sign') as Record<string, typeof SignJWT>).SignJWT // eslint-disable-line
    }
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

    if (!this.signConstructor) {
      throw new Error('Token generation is only supported in NodeJS')
    }

    const signJWT = new this.signConstructor({
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
