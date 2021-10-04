import { HttpClient, HttpClientOptions } from './HttpClient'

export * from './HttpClient'

type HttpClientFactory = new (options: HttpClientOptions) => HttpClient

export function createClientForEnvironment(options: HttpClientOptions): HttpClient {
  let adapter: HttpClientFactory | undefined = undefined
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./FetchHttpClient').default as HttpClientFactory // eslint-disable-line
  } else if (
    typeof process !== 'undefined' &&
    Object.prototype.toString.call(process) === '[object process]'
  ) {
    // For node use HTTP adapter
    adapter = require('./NodeHttpClient').default as HttpClientFactory // eslint-disable-line
  }

  if (!adapter) {
    throw new Error('Unable to determine HttpClient for environment')
  }

  return new adapter(options)
}
