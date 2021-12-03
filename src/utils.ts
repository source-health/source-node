function writeFlattenedValue(
  input: any, // eslint-disable-line
  prefix: string | null = null,
  stringify: boolean = false,
  values: Record<string, unknown> = {},
) {
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    values[prefix ?? ''] = stringify ? String(input) : input
  } else if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      writeFlattenedValue(input[i], `${prefix ?? ''}[${i}]`, stringify, values)
    }
    // Blob is only supported in the browser and not node - we currently don't support multipart request with the NodeAdpater either
  } else if (typeof Blob !== 'undefined' && input instanceof Blob) {
    values[prefix ?? ''] = input
  } else if (input) {
    for (const [key, value] of Object.entries(input)) {
      writeFlattenedValue(value, prefix ? `${prefix}[${key}]` : key, stringify, values)
    }
  }
}

/**
 * Converts an object to a set of query parameeters
 *
 * @param input the object that needs to be converted
 * @returns a map of flattened query parameters
 */
export function toUrlEncoded(input: unknown, stringify: true): Record<string, string>
export function toUrlEncoded(input: unknown, stringify?: false): Record<string, unknown>
export function toUrlEncoded(input: unknown, stringify: boolean = false): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  writeFlattenedValue(input, '', stringify, values)
  return values
}

/**
 * Serializes an object into a query string
 *
 * @param input the object that needs to be converted
 * @returns a flattened query parameter
 */
export function serializeQuery(input: Record<string, unknown>): string {
  let query = ''

  for (const [key, value] of Object.entries(input)) {
    query += `${query ? '&' : ''}${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
  }

  return query
}

/**
 *
 */
export function isTimeoutError(error: Error): boolean {
  return (error as any).code && (error as any).code === 'ETIMEDOUT' // eslint-disable-line
}

/**
 * Create a new URL from a base and appended path
 *
 * @param base the base URL to interpret relative from
 * @param path the target URL to hit
 * @param query query parameters to append
 * @return the created URL
 */
export function createUrl(
  base: string | undefined,
  path: string,
  query?: Record<string, string | string[] | undefined>,
): URL {
  const basePath = new URL(path, base)

  // If there were no query params provided, there's nothing to do
  if (!query) {
    return basePath
  }

  // Otherwise, we need to serialize query params
  const serializedQuery = serializeQuery(toUrlEncoded(query))
  if (!serializedQuery) {
    return basePath
  }

  // Append to existing query params, or attach them
  basePath.search = basePath.search ? basePath.search + '&' + serializedQuery : serializedQuery
  return basePath
}
