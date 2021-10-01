interface SourceErrorData {
  code?: string | null
  type?: string
  message: string
  cause?: Error
}

export class SourceError extends Error {
  public readonly type: string
  public readonly code: string | null = null
  public readonly cause: Error | null = null

  constructor({ cause, code, message, type }: SourceErrorData) {
    super(message)

    this.type = type ?? 'client_error'
    this.code = code ?? null
    this.cause = cause ?? null
  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types, 
                    @typescript-eslint/no-unsafe-assignment,
                    @typescript-eslint/no-unsafe-member-access, 
                    @typescript-eslint/no-explicit-any */
  public static from(response: any): SourceError {
    return new SourceError({
      type: response.type,
      code: response.code,
      message: response.message,
    })
  }
  /* eslint-enable */
}
