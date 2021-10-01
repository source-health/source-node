import { SourceClient } from './SourceClient'

type ResourceConstructor<T> = new (source: SourceClient) => T
type SourceFactory<T> = (source: SourceClient) => T
export type SourceInstance<T> = T extends Record<string, SourceFactory<unknown>>
  ? {
      [K in keyof T]: SourceInstance<T[K]>
    }
  : T extends SourceFactory<infer R>
  ? R
  : never

export function resourceNamespace<T extends Record<string, SourceFactory<unknown>>>(
  entries: T,
): SourceFactory<SourceInstance<T>> {
  return (source) =>
    Object.fromEntries(
      Object.entries(entries).map(([key, factory]) => [key, factory(source)]),
    ) as SourceInstance<T>
}

export function resourceFactory<T>(constructor: ResourceConstructor<T>): SourceFactory<T> {
  return (source) => new constructor(source)
}
