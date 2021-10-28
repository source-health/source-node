import { SourceConfiguration } from '../SourceConfiguration'

import { TokenGenerator } from './TokenGenerator'
export * from './TokenGenerator'

type TokenGeneratorFactory = new (configuration: SourceConfiguration) => TokenGenerator

export function createTokenGenerator(configuration: SourceConfiguration): TokenGenerator {
  let adapter: TokenGeneratorFactory | undefined = undefined

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./StubTokenGenerator').default as TokenGeneratorFactory // eslint-disable-line
  } else {
    // For node use HTTP adapter
    adapter = require('./NodeTokenGenerator').default as TokenGeneratorFactory // eslint-disable-line
  }

  return new adapter(configuration)
}
