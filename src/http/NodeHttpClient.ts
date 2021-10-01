import * as http from 'http'
import * as https from 'https'

import { SourceError } from '../SourceError'
import { isTimeoutError } from '../utils'

import { HttpClient, HttpClientOptions, HttpRequest, HttpResponse } from './HttpClient'

export interface NodeHttpClientOptions extends HttpClientOptions {
  /**
   * Default agent to use for requests. Must match the protocol.
   */
  readonly agent?: http.Agent | https.Agent | null
}

export class NodeHttpClient implements HttpClient {
  // Default HTTP agent to use for all outgoing requests
  private static defaultHttpAgent = new http.Agent({ keepAlive: true })

  // Default HTTPs agent to use for all outgoing requestsAlive: true })
  private static defaultHttpsAgent = new https.Agent({ keepAlive: true })

  // Base URL once it has been parsed
  private readonly baseUrl: URL

  constructor(private readonly options: NodeHttpClientOptions) {
    this.baseUrl = new URL(this.options.base)
  }

  public request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      const timeout = request.options?.timeout ?? this.options.timeout
      const isInsecureConnection = this.baseUrl.protocol === 'http'
      let agent = this.options.agent
      if (!agent) {
        agent = isInsecureConnection
          ? NodeHttpClient.defaultHttpAgent
          : NodeHttpClient.defaultHttpsAgent
      }

      const req = (isInsecureConnection ? http : https).request({
        agent,
        host: this.baseUrl.host,
        port: this.baseUrl.port,
        path: request.path,
        method: request.method,
        headers: request.headers,
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
            }

            resolve({
              status: res.statusCode ?? 0,
              headers: res.headers,
              data: parsed,
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
            message: 'Unable to connect to ${req.host}',
            cause: error,
          }),
        )
      })

      req.once('socket', (socket) => {
        if (socket.connecting) {
          socket.once(isInsecureConnection ? 'connect' : 'secureConnect', () => {
            // Send payload; we're safe:
            req.write(request.data ?? '')
            req.end()
          })
        } else {
          // we're already connected
          req.write(request.data ?? '')
          req.end()
        }
      })
    })
  }
}
