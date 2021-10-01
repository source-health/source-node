import { HttpClient, HttpClientOptions } from './HttpClient'
import { NodeHttpClient } from './NodeHttpClient'

export * from './HttpClient'

export function createClientForEnvironment(options: HttpClientOptions): HttpClient {
  return new NodeHttpClient(options)
}
