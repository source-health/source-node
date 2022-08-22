import { SignJWT } from 'jose/jwt/sign' // eslint-disable-line

import { SourceConfiguration } from '../SourceConfiguration'
import { SourceError } from '../SourceError'
import { ApiKeyAuthentication } from '../authentication'

import { TokenGenerator, TokenOptions } from './TokenGenerator'

/**
 * The public TokenOptions definition includes a deprecated backwards-compatibility shim, allowing 'member' as an alias
 * for 'subject'. Define the options after taking that into account.
 */
interface ValidatedTokenOptions {
  subject: string
  actor?: string
  expiration: Date
  scopes?: string[]
}

export default class NodeTokenGenerator implements TokenGenerator {
  private readonly encoder = new TextEncoder()

  constructor(private readonly configuration: SourceConfiguration) {}

  /**
   * Generates a JWT suitable to allow a member to access the API
   *
   * @param options options for configuring the generated token
   * @returns a generated token that allows a member access to the API
   */
  public async generate(options: TokenOptions): Promise<string> {
    // Handle backwards-compatible 'member' alias
    const validatedOptions = this.validateOptions(options)
    return await this.generateWithValidOptions(validatedOptions)
  }

  /**
   * The actual implementation after accounting for backwards compatibility.
   */
  private async generateWithValidOptions(options: ValidatedTokenOptions): Promise<string> {
    const authentication = this.configuration.getAuthentication()
    if (!(authentication instanceof ApiKeyAuthentication)) {
      throw new Error('You may only generate tokens when using API key authentication')
    }

    const signJWT = new SignJWT({
      sub: options.subject,
      act: options.actor,
      iat: Math.floor(Date.now() / 1_000),
      exp: Math.floor(options.expiration.getTime() / 1_000),
      scopes: options.scopes ?? [],
    })

    return await signJWT
      .setProtectedHeader({ alg: 'HS256', kid: authentication.id })
      .sign(this.encoder.encode(authentication.secret))
  }

  /**
   * Validate and transform the options to account for us allowing 'member' as a deprecated alias for 'subject'.
   * 1. We must have a subject (as 'subject' OR 'member')
   * 2. If using the member alias, there must not be 'subject' or 'actor' defined, since it is ambiguous and we only
   *    allow it for backwards compatibility.
   */
  private validateOptions(options: TokenOptions): ValidatedTokenOptions {
    if (options.member) {
      if (options.subject || options.actor) {
        throw new SourceError({
          message:
            "The 'member' token option is deprecated and cannot be combined with 'subject' or 'actor' options",
        })
      }
    }
    const subject = options.subject ?? options.member
    if (!subject) {
      throw new SourceError({
        message: "You must supply either 'subject' or the deprecated alias 'member' token options",
      })
    }
    return {
      subject,
      actor: options.actor,
      expiration: options.expiration,
      scopes: options.scopes,
    }
  }
}
