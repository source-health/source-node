import { PlatformGenerator } from './PlatformGenerator'
import { TypescriptGenerator } from './TypescriptGenerator'

export type GeneratorFactory<TOptions> = new (options: TOptions) => PlatformGenerator

const platforms: Record<string, GeneratorFactory<any> | undefined> = { // eslint-disable-line
  typescript: TypescriptGenerator,
}

export function createPlatform(name: string): PlatformGenerator {
  const Platform = platforms[name]
  if (!Platform) {
    throw new Error(`No known platform "${name}"`)
  }

  return new Platform({})
}
