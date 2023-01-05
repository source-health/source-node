export interface Error {
  object: 'error'
  /**
   * The type of error encountered.
   */
  type: ErrorType
  /**
   * For errors that could be handled programmatically, a short string indicating the
   * error code reported.
   */
  code: string
  /**
   * A human-readable message providing more details about the error.
   */
  message: string
  /**
   * Unique ID for the request where the error was encountered.
   */
  request_id: string | null
  /**
   * Additional information sent along with the error
   */
  meta?: Record<string, unknown>
}

export type ErrorType =
  | 'api_error'
  | 'api_connection_error'
  | 'invalid_request_error'
  | 'authentication_error'
  | 'authorization_error'
  | 'unprocessable_request_error'
