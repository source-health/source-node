import { SourceError } from '../SourceError'
import { createUrl, toUrlEncoded } from '../utils'

import { HttpAdapter, HttpRequest, HttpResponse } from './HttpAdapter'

export default class FetchAdapter implements HttpAdapter {
  public async request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>> {
    const { timeout } = request.options ?? {}
    const controller = new AbortController()
    const timer = timeout ? setTimeout(() => controller.abort(), timeout) : null

    try {
      const { headers, data } = this.serializeContent(request.data, request.contentType)
      const url = createUrl(request.baseUrl, request.path, request.query)

      const response = await fetch(url.toString(), {
        signal: controller.signal,
        method: request.method,
        headers: {
          ...headers,
          ...request.headers,
        },
        body: data,
      })

      const responseData = (await response.json()) as Record<string, unknown>

      if (responseData.object === 'error') { // eslint-disable-line
        throw SourceError.from(responseData)
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
    } finally {
      if (timer) {
        clearTimeout(timer)
      }
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
      case 'multipart': {
        const values = toUrlEncoded(content)
        const data = new FormData()

        for (const [key, value] of Object.entries(values)) {
          const isBlob = value instanceof Blob || toString.call(value) === '[object Blob]'
          data.append(key, isBlob ? (value as Blob) : String(value))
        }

        return {
          data,
        }
      }
    }
  }
}
