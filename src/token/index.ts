import { Authentication } from '../authentication'

import { TokenGenerator } from './TokenGenerator'
export * from './TokenGenerator'

type TokenGeneratorFactory = new (authentication: Authentication) => TokenGenerator

export function createTokenGenerator(authentication: Authentication): TokenGenerator {
  let adapter: TokenGeneratorFactory | undefined = undefined

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./StubTokenGenerator').default as TokenGeneratorFactory // eslint-disable-line
  } else {
    // For node use HTTP adapter
    adapter = require('./NodeTokenGenerator').default as TokenGeneratorFactory // eslint-disable-line
  }

  return new adapter(authentication)
}
