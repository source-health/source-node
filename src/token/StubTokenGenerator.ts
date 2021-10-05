import { TokenGenerator } from './TokenGenerator'

export default class StubTokenGenerator implements TokenGenerator {
  generate(): Promise<string> {
    return Promise.reject(new Error('Tokens can only be generated in a Node.js environment'))
  }
}
