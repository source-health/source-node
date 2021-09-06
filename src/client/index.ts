import { HttpClient, HttpClientOptions } from './HttpClient'
import { NodeClient } from './NodeClient'

export * from './HttpClient'

export function createClientForEnvironment(options: HttpClientOptions): HttpClient {
  return new NodeClient(options)
}
