import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

export class Filesystem {
  constructor(public readonly root: string) {}

  public async readFile(path: string): Promise<Buffer> {
    return readFile(join(this.root, path))
  }

  public async writeFile(path: string, contents: Buffer): Promise<void> {
    const pathToMakeDirectory = join(this.root, path)
    await mkdir(dirname(pathToMakeDirectory), {
      recursive: true,
    })

    return writeFile(join(this.root, path), contents)
  }
}
