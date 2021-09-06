import { OpenAPIV3 } from 'openapi-types'

import { Model } from './Model'
import { OperationModel } from './OperationModel'

export class ResourceModel extends Model<OpenAPIV3.SchemaObject> {
  constructor(
    public readonly name: string,
    public readonly schema: OpenAPIV3.SchemaObject,
    public readonly operations: OperationModel[],
  ) {
    super(schema)
  }
}
