import { Response } from './Response'
import { HttpAdapter, HttpRequest, HttpRequestOptions } from './adapter'
import { Authentication } from './authentication'
import { toQuery } from './utils'

export interface SourceRequestOptions extends HttpRequestOptions {
  expand?: string[]
}

export interface RequestArguments extends Omit<HttpRequest, 'path' | 'method' | 'query'> {
  readonly query?: unknown
  readonly options?: SourceRequestOptions
}

export class SourceClient {
  constructor(
    private readonly http: HttpAdapter,
    private readonly authentication: Authentication,
  ) {}

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
    const { options, query, headers, ...request } = args
    const { expand, ...otherOptions } = options ?? {}
    const actualQueryParams = query ? toQuery(query) : {}
    const mergedQueryParams = expand ? { ...actualQueryParams, expand } : actualQueryParams

    const response = await this.http.request<T>({
      ...request,
      method,
      path,
      query: mergedQueryParams,
      options: otherOptions,
      headers: {
        ...this.authentication.createHeaders(),
        ...headers,
      },
    })

    return Object.assign(response.data, {
      response: {
        statusCode: response.status,
        headers: response.headers,
      },
    })
  }
}
