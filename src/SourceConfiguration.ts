import { SourceRequestOptions } from './SourceClient'
import { HttpRequestInterceptor } from './adapter'
import { ApiKeyAuthentication, Authentication } from './authentication'

export interface SourceConfigurationOptions {
  /**
   * Base URL to apply to all outgoing requests
   */
  baseUrl: string

  /**
   * Authentication to use on outgoing requests
   */
  authentication?: Authentication

  /**
   * Default options to apply to all outgoing requests
   */
  defaultRequestOptions?: SourceRequestOptions

  /**
   * Default options to apply to all outgoing requests
   */
  requestInterceptors?: HttpRequestInterceptor[]
}

export class SourceConfiguration {
  private _baseUrl: string
  private _authentication: Authentication
  private _requestOptions: SourceRequestOptions
  private _interceptors: HttpRequestInterceptor[] = []

  constructor(values: SourceConfigurationOptions) {
    this._baseUrl = values.baseUrl
    this._authentication =
      typeof values.authentication === 'undefined'
        ? ApiKeyAuthentication.fromEnvironment()
        : values.authentication
    this._requestOptions = values.defaultRequestOptions ?? {}
    this._interceptors = values.requestInterceptors ?? []
  }

  public setAuthentication(authentication: Authentication): void {
    this._authentication = authentication
  }

  public getAuthentication(): Authentication {
    return this._authentication
  }

  public setBaseUrl(baseUrl: string): void {
    this._baseUrl = baseUrl
  }

  public getBaseUrl(): string {
    return this._baseUrl
  }

  public setRequestOptions(options: SourceRequestOptions): void {
    this._requestOptions = options
  }

  public getRequestOptions(): SourceRequestOptions {
    return this._requestOptions
  }

  public addRequestInterceptor(interceptor: HttpRequestInterceptor): void {
    this._interceptors = this._interceptors.concat(interceptor)
  }

  public removeInterceptor(interceptor: HttpRequestInterceptor): void {
    this._interceptors = this._interceptors.filter((value) => value !== interceptor)
  }

  public getInterceptors(): HttpRequestInterceptor[] {
    return this._interceptors
  }
}
