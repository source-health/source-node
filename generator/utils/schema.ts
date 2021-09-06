import { OpenAPIV3 } from 'openapi-types'

export function isReference<T>(
  input: T | OpenAPIV3.ReferenceObject,
): input is OpenAPIV3.ReferenceObject {
  return typeof (input as any).$ref !== 'undefined' // eslint-disable-line
}

export function assertNotReference<T>(input: T | OpenAPIV3.ReferenceObject): T {
  if (isReference(input)) {
    throw new Error('Unexpected reference was found')
  }

  return input
}
