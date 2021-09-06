import { DocumentModel } from '../model/DocumentModel'
import { GeneratorContext } from '../support/GeneratorContext'

export interface PlatformGeneratorOptions {}

export interface PlatformGenerator {
  /**
   * Preprocesses the document that needs to be generated
   *
   * During this method, fields of the DocumentModel may be mutated and those mutations will be
   * accessible during the generation stage.
   *
   * @param context context from the generator
   * @param document document that needs to be generated
   */
  generate(context: GeneratorContext, document: DocumentModel): Promise<void>
}
