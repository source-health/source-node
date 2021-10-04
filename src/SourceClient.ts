import { Response } from './Response'
import { Authentication } from './authentication'
import { HttpClient, HttpRequestOptions } from './http'
import { serializeQuery, toQuery } from './utils'

interface SourceRequestOptions extends HttpRequestOptions {
  expand?: string[]
}

interface RequestArguments {
  readonly params?: unknown
  readonly options?: SourceRequestOptions
}

export class SourceClient {
  constructor(private readonly http: HttpClient, private readonly authentication: Authentication) {}

  /**
   * Execute a request against the Source API
   *
   * This method wraps the HttpClient's request method to add Source-specific functionality at
   * a higher level. We use this method to encode request parameters, parse out responses, and generally
   * enforce API conventions.
   *
   * @param method request method to send
   * @param path path to send the request to
   * @param args arguments of the request
   * @returns a response to the HTTP request
   */
  public async request<T>(
    method: string,
    path: string,
    args: RequestArguments,
  ): Promise<Response<T>> {
    const isDataInQuery = method.toUpperCase() === 'GET'
    const bodyObject = isDataInQuery ? null : (args.params as Record<string, unknown>)
    const queryObject =
      isDataInQuery && args.params ? ((args.params || {}) as Record<string, unknown>) : null

    if (queryObject && args.options?.expand) {
      queryObject.expand = args.options.expand
    }

    const fullPath = path + (queryObject ? `?${serializeQuery(toQuery(queryObject))}` : '')
    const headers: Record<string, string | string[] | undefined> = !isDataInQuery
      ? {
          'Content-Type': 'application/json',
        }
      : {}

    const response = await this.http.request({
      method,
      path: fullPath,
      data: bodyObject ? JSON.stringify(bodyObject) : null,
      headers: {
        ...this.authentication.createHeaders(),
        ...headers,
      },
    })

    return Object.assign(response.data as T, {
      response: {
        statusCode: response.status,
        headers: response.headers,
      },
    })
  }
}
