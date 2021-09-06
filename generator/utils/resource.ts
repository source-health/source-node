import { OpenAPIV3 } from 'openapi-types'

import { assertNotReference } from './schema'

export function extractResource(operation: OpenAPIV3.OperationObject): string | null {
  const defaultResponse = assertNotReference(operation.responses.default)
  if (!defaultResponse) { // eslint-disable-line
    return null
  }

  const mediaType = Object.keys(defaultResponse.content ?? {})[0]
  if (!mediaType) {
    return null
  }

  let schema = assertNotReference(defaultResponse.content?.[mediaType].schema)
  if (!schema) {
    return null
  }

  // Unwrap lists to get the inner itme
  const objectProperty = schema.properties?.object && assertNotReference(schema.properties.object)
  if (objectProperty?.enum?.[0] === 'list') {
    const dataProperty = schema.properties?.data && assertNotReference(schema.properties.data)
    if (dataProperty?.type !== 'array') {
      return null
    }

    schema = assertNotReference(dataProperty.items)
  }

  return (schema as any)['x-openapi-name'] ?? null // eslint-disable-line
}
