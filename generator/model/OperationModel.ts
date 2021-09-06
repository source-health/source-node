import { OpenAPIV3 } from 'openapi-types'

import { assertNotReference } from '../utils/schema'

import { ContentModel } from './ContentModel'
import { Model } from './Model'
import { ParameterModel } from './ParameterModel'
import { ResponseModel } from './ResponsesModel'

export class OperationModel extends Model<OpenAPIV3.OperationObject> {
  public readonly id: string
  public readonly path: string
  public readonly method: OpenAPIV3.HttpMethods
  public readonly summary: string | null
  public readonly description: string | null
  public readonly pathParameters: ParameterModel[]
  public readonly queryParameters: ParameterModel[]
  public readonly request: ContentModel | null
  public readonly responses: ResponseModel[]
  public readonly tags: string[]

  private constructor(
    path: string,
    method: OpenAPIV3.HttpMethods,
    operation: OpenAPIV3.OperationObject,
  ) {
    super(operation)

    this.id =
      operation.operationId ??
      `${path}-${method}`
        .replace(/[^A-Za-z0-9-]/g, '-')
        .replace(/--+/g, '-')
        .replace(/(?:^-|-$)/g, '')
    this.path = path
    this.method = method
    this.summary = operation.summary ?? null
    this.description = operation.description ?? null
    this.tags = operation.tags ?? []

    // Get all mapped parameters
    const parameters = operation.parameters?.map((parameter) => assertNotReference(parameter)) ?? []

    // Get all of the path parameters
    this.pathParameters = parameters
      .filter((parameter) => parameter.in === 'path')
      .map((parameter) => ParameterModel.from(parameter))

    // Get all of the query parameters
    this.queryParameters = parameters
      .filter((parameter) => parameter.in === 'query')
      .map((parameter) => ParameterModel.from(parameter))

    // Map the requests
    const requestBody = operation.requestBody ? assertNotReference(operation.requestBody) : null
    this.request = requestBody ? ContentModel.from(requestBody.content) : null

    // Map all responses to their dereferenced version
    this.responses = Object.entries(operation.responses).map(([code, response]) => {
      return ResponseModel.from(code, response)
    })
  }

  public get defaultResponse(): ResponseModel {
    return this.responses[0]
  }

  public get querySchema(): OpenAPIV3.SchemaObject | null {
    if (this.queryParameters.length === 0) {
      return null
    }

    return {
      type: 'object',
      properties: Object.fromEntries(
        this.queryParameters.map((parameter) => [parameter.name, parameter.schema]),
      ),
      required: this.queryParameters
        .filter((parameter) => parameter.required)
        .map((parameter) => parameter.name),
    }
  }

  public static from(
    path: string,
    method: OpenAPIV3.HttpMethods,
    operation: OpenAPIV3.OperationObject,
  ): OperationModel {
    return new OperationModel(path, method, operation)
  }
}
