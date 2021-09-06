import { Environment, configure } from 'nunjucks'

import { Filesystem } from './Filesystem'

export class GeneratorContext {
  private readonly templateEnvironment: Environment

  constructor(
    private readonly templateFilesystem: Filesystem,
    private readonly outputFilesystem: Filesystem,
  ) {
    this.templateEnvironment = configure({
      autoescape: false,
    })
    this.templateEnvironment.addFilter('json', (input: unknown) => JSON.stringify(input))
    this.templateEnvironment.addFilter('wrap', (input: string, w: number) =>
      input.replace(new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'),
    )
    this.templateEnvironment.addFilter(
      'prefix',
      (input: string, prefix: string, start: number = 0) =>
        input
          .split('\n')
          .map((line, i) => (i >= start ? `${prefix}${line}` : line))
          .join('\n'),
    )
  }

  /**
   * Renders a template and returns the output contents
   *
   * @param template
   * @param variables
   * @returns
   */
  public async render(template: string, variables: Record<string, unknown>): Promise<string> {
    const templateString = await this.templateFilesystem.readFile(template)

    return new Promise((resolve, reject) => {
      this.templateEnvironment.renderString(
        templateString.toString('utf8'),
        variables,
        (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result ?? '')
          }
        },
      )
    })
  }

  /**
   * Renders a template and returns the output contents
   *
   * @param template
   * @param variables
   * @returns
   */
  public async renderAndWrite(
    template: string,
    destination: string,
    variables: Record<string, unknown>,
  ): Promise<void> {
    const rendered = await this.render(template, variables)
    return this.outputFilesystem.writeFile(destination, Buffer.from(rendered, 'utf8'))
  }
}
