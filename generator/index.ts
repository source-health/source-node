import { CodeGenerator } from './CodeGenerator'

CodeGenerator.run({ language: 'typescript', specification: '../catalyst/openapi.json' }).then(
  (done) => {
    console.log('Done')
  },
)
