import { Response } from './Response'
import { SourceConfiguration } from './SourceConfiguration'
import { HttpAdapter, HttpRequest, HttpRequestOptions, HttpResponse } from './adapter'
import { Authentication } from './authentication'
import { toUrlEncoded } from './utils'

export interface SourceRequestOptions extends HttpRequestOptions {
  /**
   * Expansion options for this request
   */
  expand?: string[]

  /**
   * Override the authentication for this API call (defaults to the client's auth)
   */
  authentication?: Authentication
}

export interface RequestArguments extends Omit<HttpRequest, 'path' | 'method' | 'query'> {
  readonly query?: unknown
  readonly options?: SourceRequestOptions
}

export class SourceClient {
  constructor(
    private readonly http: HttpAdapter,
    private readonly configuration: SourceConfiguration,
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
    const baseUrl = this.configuration.getBaseUrl()
    const defaultAuthentication = this.configuration.getAuthentication()
    const { options, query, headers, ...request } = args
    const { expand, authentication = defaultAuthentication, ...otherOptions } = options ?? {}
    const actualQueryParams = query ? toUrlEncoded(query, true) : {}
    const mergedQueryParams = expand ? { ...actualQueryParams, expand } : actualQueryParams
    const defaultOptions = this.configuration.getRequestOptions()
    const interceptors = this.configuration.getInterceptors()

    let index = 0
    const next = async (request: HttpRequest): Promise<HttpResponse<T>> => {
      if (index >= interceptors.length) {
        return await this.http.request<T>(request)
      } else {
        return interceptors[index++](request, next) as Promise<HttpResponse<T>>
      }
    }

    const response = await next({
      ...request,
      baseUrl,
      method,
      path,
      query: mergedQueryParams,
      options: {
        ...defaultOptions,
        ...otherOptions,
      },
      headers: {
        ...authentication.createHeaders(),
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
