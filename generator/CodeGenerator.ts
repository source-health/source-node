import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPIV3 } from 'openapi-types'
import { join } from 'path'

import { createPlatform } from './languages'
import { DocumentModel } from './model/DocumentModel'
import { OperationModel } from './model/OperationModel'
import { ResourceModel } from './model/ResourceModel'
import { Filesystem } from './support/Filesystem'
import { GeneratorContext } from './support/GeneratorContext'
import { extractResource } from './utils/resource'
import { assertNotReference } from './utils/schema'

interface GenerateOptions {
  /**
   * Pointer to the specification file
   */
  readonly specification: string
  /**
   * Language for which we want to run the generator
   */
  readonly language: string
}

export class CodeGenerator {
  public async run(options: GenerateOptions): Promise<void> {
    const document = (await SwaggerParser.parse(options.specification)) as OpenAPIV3.Document

    // Attach the original swagger name to each schema
    for (const [name, schema] of Object.entries(document.components?.schemas ?? {})) {
      Object.assign(schema, {
        'x-openapi-name': name,
      })
    }

    // Dereference the document now that we have encoded schemas all named
    const methods = Object.values(OpenAPIV3.HttpMethods)
    const parsed = (await SwaggerParser.dereference(document)) as OpenAPIV3.Document

    // Capture/generate the list of resources
    const groupedOperations: Record<string, OperationModel[] | undefined> = {}

    // Walk all the operations and group them by resource
    for (const [path, operations] of Object.entries(parsed.paths)) {
      for (const method of methods) {
        const operation = operations?.[method]
        if (!operation) {
          continue
        }

        // Parse out the operation
        const operationModel = OperationModel.from(path, method, operation)

        // Get the resource name from this operation and append this operation to the group
        const resourceName = extractResource(operation) ?? 'shared'
        groupedOperations[resourceName] = [
          ...(groupedOperations[resourceName] ?? []),
          operationModel,
        ]
      }
    }

    // Create all of the resources
    const resources: ResourceModel[] = []
    for (const [key, operations] of Object.entries(groupedOperations)) {
      const schema = document.components?.schemas?.[key]
      if (!schema) {
        continue
      }

      // Create a reseource object with the operations
      resources.push(new ResourceModel(key, assertNotReference(schema), operations ?? []))
    }

    // Create a new language-specific generator and run
    const parsedDocument = new DocumentModel(resources)
    const context = new GeneratorContext(
      new Filesystem(join(__dirname, 'templates', 'typescript')),
      new Filesystem(join(__dirname, '..', 'src', 'resources')),
    )
    const generator = createPlatform(options.language)

    // Run the generator
    await generator.generate(context, parsedDocument)
  }

  public static async run(options: GenerateOptions): Promise<void> {
    const instance = new CodeGenerator()
    await instance.run(options)
  }
}
