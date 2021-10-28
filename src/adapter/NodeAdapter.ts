import * as http from 'http'
import * as https from 'https'

import { SourceError } from '../SourceError'
import { createUrl, isTimeoutError } from '../utils'

import { HttpAdapter, HttpRequest, HttpResponse } from './HttpAdapter'

export interface NodeHttpClientOptions {
  /**
   * Default agent to use for requests. Must match the protocol.
   */
  readonly agent?: http.Agent | https.Agent | null
}

export default class NodeHttpClient implements HttpAdapter {
  // Default HTTP agent to use for all outgoing requests
  private static defaultHttpAgent = new http.Agent({ keepAlive: true })

  // Default HTTPs agent to use for all outgoing requestsAlive: true })
  private static defaultHttpsAgent = new https.Agent({ keepAlive: true })

  constructor(private readonly options: NodeHttpClientOptions = {}) {}

  public request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      const { timeout } = request.options ?? {}
      const { headers, data } = this.serializeContent(request.data, request.contentType)
      const url = createUrl(request.baseUrl, request.path, request.query)
      const isInsecureConnection = url.protocol === 'http:'
      let agent = this.options.agent
      if (!agent) {
        agent = isInsecureConnection
          ? NodeHttpClient.defaultHttpAgent
          : NodeHttpClient.defaultHttpsAgent
      }

      const req = (isInsecureConnection ? http : https).request({
        agent,
        host: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: request.method,
        timeout,
        headers: {
          ...headers,
          ...request.headers,
        },
        ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
      })

      req.once('response', (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          try {
            const parsed = JSON.parse(data) // eslint-disable-line

            if (parsed.object === 'error') { // eslint-disable-line
              reject(SourceError.from(parsed))
              return
            }

            resolve({
              status: res.statusCode ?? 0,
              headers: res.headers,
              data: parsed as T,
            })
          } catch (ex) {
            reject(
              new SourceError({
                type: 'client_error',
                code: 'invalid_response',
                message: 'Invalid response received from the API',
                cause: ex as Error,
              }),
            )
          }
        })
      })

      req.on('error', (error) => {
        if (isTimeoutError(error)) {
          return reject(
            new SourceError({
              type: 'client_error',
              code: 'request_timeout',
              message: `Request aborted due to timeout being reached (${timeout ?? 0}ms)`,
              cause: error,
            }),
          )
        }

        return reject(
          new SourceError({
            type: 'client_error',
            code: 'connection_failed',
            message: `Unable to connect to ${req.host}`,
            cause: error,
          }),
        )
      })

      req.once('socket', (socket) => {
        if (socket.connecting) {
          socket.once(isInsecureConnection ? 'connect' : 'secureConnect', () => {
            // Send payload; we're safe:
            req.write(data ?? '')
            req.end()
          })
        } else {
          // we're already connected
          req.write(data ?? '')
          req.end()
        }
      })
    })
  }

  private serializeContent(
    content: unknown | undefined,
    contentType: HttpRequest['contentType'] = 'json',
  ): { headers?: Record<string, string>; data?: BodyInit } {
    if (typeof content === 'undefined') {
      return {}
    }

    switch (contentType) {
      case 'json':
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(content),
        }
      case 'multipart':
        throw new Error('Multipart requests are not currently supported in the fetch client')
    }
  }
}
