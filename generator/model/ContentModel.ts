import { OpenAPIV3 } from 'openapi-types'

import { MediaTypeModel } from './MediaTypeModel'
import { Model } from './Model'

export class ContentModel extends Model<Record<string, OpenAPIV3.MediaTypeObject>> {
  public readonly mediaTypes: MediaTypeModel[]

  constructor(raw: Record<string, OpenAPIV3.MediaTypeObject>) {
    super(raw)

    this.mediaTypes = Object.entries(raw).map(([type, media]) => {
      return MediaTypeModel.from(type, media)
    })
  }

  public get default(): MediaTypeModel {
    return this.mediaTypes[0]
  }

  public static from(raw: Record<string, OpenAPIV3.MediaTypeObject>): ContentModel {
    return new ContentModel(raw)
  }
}
