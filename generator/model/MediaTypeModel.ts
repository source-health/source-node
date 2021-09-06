import { OpenAPIV3 } from 'openapi-types'

import { assertNotReference } from '../utils/schema'

import { Model } from './Model'

export class MediaTypeModel extends Model<OpenAPIV3.MediaTypeObject> {
  public readonly type: string
  public readonly schema: OpenAPIV3.SchemaObject

  private constructor(type: string, raw: OpenAPIV3.MediaTypeObject) {
    super(raw)

    this.type = type
    this.schema = raw.schema ? assertNotReference(raw.schema) : {}
  }

  public static from(type: string, raw: OpenAPIV3.MediaTypeObject): MediaTypeModel {
    return new MediaTypeModel(type, raw)
  }
}
