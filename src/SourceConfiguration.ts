import { SourceRequestOptions } from './SourceClient'
import { ApiKey, Authentication } from './authentication'

export interface SourceConfigurationOptions {
  baseUrl: string
  authentication?: Authentication
  defaultRequestOptions?: SourceRequestOptions
}

export class SourceConfiguration {
  private _baseUrl: string
  private _authentication: Authentication
  private _requestOptions: SourceRequestOptions

  constructor(values: SourceConfigurationOptions) {
    this._baseUrl = values.baseUrl
    this._authentication =
      typeof values.authentication === 'undefined'
        ? ApiKey.fromEnvironment()
        : values.authentication
    this._requestOptions = values.defaultRequestOptions ?? {}
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
}
