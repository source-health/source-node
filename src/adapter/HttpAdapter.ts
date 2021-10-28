export interface HttpRequestOptions {
  /**
   * Request-level timeout override
   */
  readonly timeout?: number
}

export interface HttpRequest {
  /**
   * Base URL to apply to the request
   */
  readonly baseUrl?: string

  /**
   * Path to request (appended to the base URL)
   */
  readonly path: string

  /**
   * Method to execute on the path
   */
  readonly method: string

  /**
   * Query parameters to apply to the path (they will be appended to any other query
   * parameters already present on the response)
   */
  readonly query?: Record<string, string | string[] | undefined>

  /**
   * Headers to apply to the request
   */
  readonly headers?: Record<string, string>

  /**
   * Body data for the outgoing request
   *
   * This data should be the unencoded version. We'll look at the data and the
   * contentType parameter to determine how it should be serialized
   */
  readonly data?: unknown

  /**
   * Content type used when encoding the request body
   */
  readonly contentType?: 'json' | 'multipart'

  /**
   * Request-level option overrides
   */
  readonly options?: HttpRequestOptions
}

export interface HttpResponse<T = unknown> {
  /**
   * HTTP status code (0 if the request did not complete)
   */
  readonly status: number

  /**
   * Headers received on the response
   */
  readonly headers: Record<string, string | string[] | undefined>

  /**
   * Body that was received from the service
   */
  readonly data: T
}

export interface HttpAdapter {
  /**
   * Executes the provideed request and returns an appropriate response
   *
   * @param request request to execute
   * @return the response
   */
  request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>>
}

export type HttpRequestInterceptor = (
  request: HttpRequest,
  next: (request: HttpRequest) => Promise<HttpResponse>,
) => Promise<HttpResponse>
