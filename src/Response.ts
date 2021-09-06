export type Response<T> = T & {
  response?: {
    statusCode: number
    headers: Record<string, string | string[] | undefined>
  }
}
