import { OpenAPIV3 } from 'openapi-types'

import { isTimeoutError } from '../../src/utils'
import { DocumentModel } from '../model/DocumentModel'
import { OperationModel } from '../model/OperationModel'
import { ResourceModel } from '../model/ResourceModel'
import { GeneratorContext } from '../support/GeneratorContext'
import { assertNotReference } from '../utils/schema'

import type { PlatformGenerator } from './PlatformGenerator'

interface TypescriptGeneratorOptions {}

interface FieldDefinition {
  readonly comment: string | null
  readonly type: string
  readonly name: string
  readonly optional: boolean
  readonly readonly: boolean
}

interface TypeDefinition {
  name: string
  fields: FieldDefinition[]
}

class TypescriptContents {
  private readonly types: Record<string, TypeDefinition> = {}

  public get allTypes(): TypeDefinition[] {
    return Object.values(this.types)
  }

  public addType(definition: TypeDefinition) {
    this.types[definition.name] = definition
  }
}

export class TypescriptGenerator implements PlatformGenerator {
  constructor(private readonly options: TypescriptGeneratorOptions = {}) {}

  public async generate(context: GeneratorContext, document: DocumentModel): Promise<void> {
    const namespaces = document.resources.map((resource) => ({
      name: resource.name,
      filename: (resource.schema.title?.split(' ')?.join('') ?? resource.name) + '.ts',
      className: `${resource.schema.title?.split(' ')?.join('') ?? resource.name}Context`,
      resource,
    }))

    for (const { resource, filename } of namespaces) {
      const contents = new TypescriptContents()

      // Write this schema to the file
      this.convertType(resource.name, resource.schema, [resource.name], contents)

      // Generate the operations list to add
      const operations = resource.operations.map((operation) =>
        this.convertOperation(resource, operation, contents),
      )

      // Write this namespace's file (including all types)
      await context.renderAndWrite('resource.ts.nj', filename, {
        operationClassName: `${resource.raw.title?.replace(/\s/g, '') ?? resource.name}Context`,
        operations: operations,
        types: contents.allTypes,
      })
    }

    // Write the index file importing all namespaces and exporting an object containing them all
    await context.renderAndWrite('barrel.ts.nj', 'index.ts', {
      namespaces,
    })
  }

  private convertOperation(
    resource: ResourceModel,
    operation: OperationModel,
    contents: TypescriptContents,
  ): unknown {
    const operationName =
      operation.summary
        ?.split(' ')
        ?.map((item) => item.substr(0, 1).toUpperCase() + item.substr(1).toLowerCase())
        ?.join('') ?? 'UnknownOperation'

    const parameterSchema =
      operation.method.toUpperCase() === 'GET'
        ? operation.querySchema
        : operation.request?.default.schema

    const paramsOptional = (parameterSchema && !parameterSchema.required?.length) ?? false

    return {
      description: operation.description,
      method: operation.method,
      path: operation.path,
      templatizedPath:
        '`' +
        operation.path.replace(/\{(\w+)\}/g, (_, key: string) => {
          return '${' + key + '}'
        }) +
        '`',
      methodName: operation.summary?.split(' ')[0]?.toLowerCase(),
      methodParameters: operation.pathParameters
        .map((parameter) => ({
          name: parameter.name,
          type: this.convertType(
            resource.name,
            parameter.schema,
            [`${operationName}`, parameter.name, 'Path'],
            contents,
          ),
          description: parameter.description,
          optional: false,
        }))
        .concat(
          parameterSchema
            ? [
                {
                  name: 'params',
                  type: this.convertType(
                    resource.name,
                    parameterSchema,
                    [`${operationName}`, 'Params'],
                    contents,
                  ),
                  description: 'Parameters for this operation',
                  optional: paramsOptional,
                },
              ]
            : [],
        ),
      hasParams: !!parameterSchema,
      returnType: this.convertType(
        resource.name,
        operation.defaultResponse.content.default.schema,
        [operationName, 'Response'],
        contents,
      ),
    }
  }

  private convertType(
    namespace: string,
    schema: OpenAPIV3.SchemaObject,
    chain: string[],
    contents: TypescriptContents,
  ): string {
    if (schema.type === 'array') {
      return `Array<${this.convertType(
        namespace,
        assertNotReference(schema.items),
        chain,
        contents,
      )}>`
    }

    if (schema.type === 'object' || !schema.type) {
      return this.convertObject(namespace, schema, chain, contents)
    }

    if (schema.oneOf || schema.allOf || schema.anyOf) {
      return 'unknown'
    }

    return this.convertPrimitive(namespace, schema, chain, contents)
  }

  private convertPrimitive(
    namespace: string,
    schema: OpenAPIV3.SchemaObject,
    chain: string[],
    contents: TypescriptContents,
  ): string {
    switch (schema.type) {
      case 'string':
        return 'string'
      case 'number':
        return 'number'
      case 'boolean':
        return 'boolean'
    }

    throw new Error('Unable to convert type')
  }

  private convertObject(
    namespace: string,
    schema: OpenAPIV3.SchemaObject,
    chain: string[],
    contents: TypescriptContents,
  ): string {
    if ((schema as any)['x-openapi-name'] && namespace !== (schema as any)['x-openapi-name']) { // eslint-disable-line
      return 'ImportedType'
    }

    const wellKnownName = schema.title?.split(' ')?.join('')
    const name = wellKnownName ?? chain.join('')
    const parentChain = wellKnownName ? [wellKnownName] : chain
    const definition: TypeDefinition = {
      name,
      fields: [],
    }

    for (const [name, property] of Object.entries(schema.properties ?? {})) {
      const dereferenced = assertNotReference(property)
      const isRequired = schema.required?.includes(name) ?? false

      definition.fields.push({
        name,
        type: this.convertType(namespace, dereferenced, parentChain.concat(name), contents),
        comment: dereferenced.description ?? null,
        optional: !isRequired,
        readonly: true,
      })
    }

    contents.addType(definition)

    return name
  }
}
