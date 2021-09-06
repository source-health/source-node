import { Response } from './Response'
import { ApiKey, Authentication } from './authentication'
import { HttpClient, HttpRequestOptions, createClientForEnvironment } from './client'
import { AccountContext, MeasurementContext } from './resources'
import { serializeQuery, toQuery } from './utils'

export interface CatalystOptions {
  /**
   * Client instance to use (if one is not provided, it will be created)
   */
  readonly client?: HttpClient
  /**
   * Timeout (in ms) to apply to all requests
   */
  readonly timeout?: number
}

interface RequestArguments {
  readonly params?: unknown
  readonly options?: HttpRequestOptions
}

export class Catalyst {
  private readonly client: HttpClient
  public readonly accounts = new AccountContext(this)
  public readonly measurements = new MeasurementContext(this)

  constructor(
    private readonly authentication: Authentication,
    private readonly options: CatalystOptions = {},
  ) {
    this.client =
      options.client ??
      createClientForEnvironment({
        base: 'https://api.withcatalyst.com',
      })
  }

  /**
   * Execute a request against the Catalyst API
   *
   * This method wraps the HttpClient's request method to add Catalyst-specific functionality at
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
    const bodyData = isDataInQuery ? null : JSON.stringify(args.params)
    const queryParams = isDataInQuery && args.params ? serializeQuery(toQuery(args.params)) : null
    const fullPath = path + (queryParams ? `?${queryParams}` : '')
    const headers: Record<string, string | string[] | undefined> = !isDataInQuery
      ? {
          'Content-Type': 'application/json',
        }
      : {}

    const response = await this.client.request({
      method,
      path: fullPath,
      data: bodyData ?? null,
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

async function main() {
  const client = new Catalyst(new ApiKey(''))
  const test = await client.accounts.get('current')
  console.log(test)
}

main()
