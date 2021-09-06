import { OpenAPIV3 } from 'openapi-types'

import { assertNotReference } from '../utils/schema'

import { ContentModel } from './ContentModel'
import { Model } from './Model'

export class ResponseModel extends Model<OpenAPIV3.ResponseObject> {
  public readonly code: string
  public readonly content: ContentModel

  private constructor(code: string, raw: OpenAPIV3.ResponseObject) {
    super(raw)

    this.code = code
    this.content = ContentModel.from(raw.content ?? {})
  }

  public static from(
    code: string,
    raw: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject,
  ): ResponseModel {
    return new ResponseModel(code, assertNotReference(raw))
  }
}
