import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testRegex: '\\.(spec|e2e)\\.ts$',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended/all'],
  moduleNameMapper: {
    // jose (especially 3.x) is a bit weird under ts-jest, needs to be told how to find the files.
    '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1',
  },
}

export default config
