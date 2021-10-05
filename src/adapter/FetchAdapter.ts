import { SourceError } from '../SourceError'
import { createUrl } from '../utils'

import { HttpAdapter, HttpAdapterOptions, HttpRequest, HttpResponse } from './HttpAdapter'

export default class FetchAdapter implements HttpAdapter {
  // Base URL once it has been parsed
  private readonly baseUrl: URL

  constructor(private readonly options: HttpAdapterOptions) {
    this.baseUrl = new URL(this.options.base)
  }

  public async request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const { headers, data } = this.serializeContent(request.data, request.contentType)
      const url = createUrl(this.baseUrl, request.path, request.query)
      const response = await fetch(url, {
        method: request.method,
        headers: {
          ...headers,
          ...request.headers,
        },
        body: data,
      })

      const responseData = (await response.json()) as Record<string, unknown>

      if (responseData.object === 'error') { // eslint-disable-line
        throw SourceError.from(data)
      }

      return {
        status: response.status,
        data: responseData as T,
        headers: Object.fromEntries([...response.headers.entries()]),
      }
    } catch (ex) {
      if (ex instanceof SourceError) {
        throw ex
      }

      throw new SourceError({
        type: 'client_error',
        code: 'invalid_response',
        message: 'Invalid response received from the API',
        cause: ex as Error,
      })
    }
  }

  private serializeContent(
    content: unknown | undefined,
    contentType: HttpRequest['contentType'] = 'json',
  ): { headers?: HeadersInit; data?: BodyInit } {
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
