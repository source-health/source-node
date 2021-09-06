import type { Catalyst } from './Catalyst'

export abstract class BaseContext {
  constructor(protected readonly catalyst: Catalyst) {}
}
