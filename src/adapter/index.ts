import { HttpAdapter } from './HttpAdapter'

export * from './HttpAdapter'

type HttpAdapterFactory = new () => HttpAdapter

export function createClientForEnvironment(): HttpAdapter {
  let adapter: HttpAdapterFactory | undefined = undefined
  if (typeof window !== 'undefined' && typeof window.fetch !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./FetchAdapter').default as HttpAdapterFactory // eslint-disable-line
  } else if (
    typeof process !== 'undefined' &&
    Object.prototype.toString.call(process) === '[object process]'
  ) {
    // For node use HTTP adapter
    adapter = require('./NodeAdapter').default as HttpAdapterFactory // eslint-disable-line
  }

  if (!adapter) {
    throw new Error('Unable to determine HttpClient for environment')
  }

  return new adapter()
}
