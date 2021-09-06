import { OpenAPIV3 } from 'openapi-types'

import { assertNotReference } from '../utils/schema'

import { Model } from './Model'

export class ParameterModel extends Model<OpenAPIV3.ParameterObject> {
  public readonly name: string
  public readonly required: boolean
  public readonly schema: OpenAPIV3.SchemaObject

  private constructor(raw: OpenAPIV3.ParameterObject) {
    super(raw)

    this.name = raw.name
    this.required = raw.required ?? false
    this.schema = raw.schema ? assertNotReference(raw.schema) : {}
  }

  public get description(): string | null {
    return this.getRaw('description') ?? null
  }

  public static from(raw: OpenAPIV3.ParameterObject): ParameterModel {
    return new ParameterModel(raw)
  }
}
