import type { SourceClient } from './SourceClient'

export abstract class Resource {
  constructor(protected readonly source: SourceClient) {}
}
