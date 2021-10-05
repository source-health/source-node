function writeFlattenedValue(
  input: any, // eslint-disable-line
  prefix: string | null = null,
  values: Record<string, string> = {},
) {
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    values[prefix ?? ''] = input as string
  } else if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      writeFlattenedValue(input[i], `${prefix ?? ''}[${i}]`, values)
    }
  } else if (input) {
    for (const [key, value] of Object.entries(input)) {
      writeFlattenedValue(value, prefix ? `${prefix}[${key}]` : key, values)
    }
  }
}

/**
 * Converts an object to a set of query parameeters
 *
 * @param input the object that needs to be converted
 * @returns a map of flattened query parameters
 */
export function toQuery(input: unknown): Record<string, string> {
  const values: Record<string, string> = {}
  writeFlattenedValue(input, '', values)
  return values
}

/**
 * Serializes an object into a query string
 *
 * @param input the object that needs to be converted
 * @returns a flattened query parameter
 */
export function serializeQuery(input: Record<string, string>): string {
  let query = ''

  for (const [key, value] of Object.entries(input)) {
    query += `${query ? '&' : ''}${encodeURIComponent(key)}=${encodeURIComponent(value)}`
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
 *
 */
export function createUrl(
  base: URL,
  path: string,
  query?: Record<string, string | string[] | undefined>,
): string {
  const basePath = new URL(path, base).toString()

  // If there were no query params provided, there's nothing to do
  if (!query) {
    return basePath
  }

  // Otherwise, we need to serialize query params
  const serializedQuery = serializeQuery(toQuery(query))
  if (!serializedQuery) {
    return basePath
  }

  // Append to existing query params, or attach them
  const separatorType = basePath.indexOf('?') === -1 ? '?' : '&'
  return [basePath, separatorType, serializedQuery].join('')
}
