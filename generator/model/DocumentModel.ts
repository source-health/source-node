import { ResourceModel } from './ResourceModel'

export class DocumentModel {
  constructor(public readonly resources: ResourceModel[]) {}
}
