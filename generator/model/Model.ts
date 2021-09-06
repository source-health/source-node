export abstract class Model<T> {
  constructor(public readonly raw: T) {}

  /**
   * Gets a raw value out of the underlying schema behind this model
   *
   * @param key the key to get from the schema
   * @param required true if a value is reequired for the key
   */
  public getRaw<K extends keyof T>(key: K, required?: false): T[K]
  public getRaw<K extends keyof T>(key: K, required: true): NonNullable<T[K]>
  public getRaw<K extends keyof T>(key: K, required: boolean = false): T[K] {
    const value = this.raw[key] as any // eslint-disable-line
    if (!value && required) {
      throw new Error(`Value was required for key ${key}`) // eslint-disable-line
    }

    return value as T[K]
  }

  /**
   * Gets an extension property from the schema
   *
   * @param key the key to fetch
   * @returns value for the property
   */
  public getExtension<TValue>(key: string): TValue | undefined {
    return (this.raw as any)[`x-${key}`] as TValue | undefined // eslint-disable-line
  }
}
