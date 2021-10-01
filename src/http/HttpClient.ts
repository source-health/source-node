export interface HttpClientOptions {
  /**
   * Default timeout to apply to all requests
   */
  readonly timeout?: number

  /**
   * Basee URL to apply to outgoing requests
   */
  readonly base: string
}

export interface HttpRequestOptions {
  /**
   * Request-level timeout override
   */
  readonly timeout?: number
}

export interface HttpRequest {
  /**
   * Path to request (appended to the base URL)
   */
  readonly path: string

  /**
   * Method to execute on the path
   */
  readonly method: string

  /**
   * Headers to apply to the request
   */
  readonly headers?: Record<string, string | string[] | undefined>

  /**
   * Body data for the outgoing request
   */
  readonly data?: string | null

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

export interface HttpClient {
  /**
   * Executes the provideed request and returns an appropriate response
   *
   * @param request request to execute
   * @return the response
   */
  request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>>
}
