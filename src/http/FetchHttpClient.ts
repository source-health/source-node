import { HttpClient, HttpClientOptions, HttpRequest, HttpResponse } from './HttpClient'

export default class FetchHttpClient implements HttpClient {
  // Base URL once it has been parsed
  private readonly baseUrl: URL

  constructor(private readonly options: HttpClientOptions) {
    this.baseUrl = new URL(this.options.base)
  }

  public async request<T = unknown>(request: HttpRequest): Promise<HttpResponse<T>> {
    const headers = new Headers({})
    for (const [key, value] of Object.entries(request.headers ?? {})) {
      if (!value) {
        continue
      }

      const items = Array.isArray(value) ? value : [value]
      for (const item of items) {
        headers.append(key, item)
      }
    }

    const response = await fetch(new URL(request.path, this.baseUrl).toString(), {
      method: request.method,
      body: request.data,
      headers: headers,
    })

    return {
      status: response.status,
      data: (await response.json()) as T,
      headers: Object.fromEntries([...response.headers.entries()]),
    }
  }
}
