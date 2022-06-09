export interface Resource {
  object: string
  id: string
}

export type Brand<T, K extends string> = T & { __brand: K }
export type Pointer<T> = Brand<string, 'pointer'> & { __referenced: T }
export type Expandable<T extends Resource = Resource> = Pointer<T> | T
