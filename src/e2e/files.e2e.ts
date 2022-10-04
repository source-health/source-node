import * as FormData from 'form-data'
import { createReadStream } from 'fs'

import { Source } from '../Source'

import { setupAccount } from './data/account'

describe('files', () => {
  let client: Source

  beforeAll(async () => {
    ;({ client } = await setupAccount())
  })

  it('creates a file and can retrieve it', async () => {
    const filename = 'src/e2e/data/image.png'
    const formData = new FormData()
    const fileStream = createReadStream(filename)
    formData.append('file', fileStream, 'photo.png')
    formData.append('purpose', 'photo')
    const response = await client.request('POST', '/v1/files', {
      data: formData,
      contentType: 'multipart',
    })
    expect(response).toMatchObject({
      object: 'file',
      mime_type: 'image/png',
      name: 'photo.png',
      purpose: 'photo',
    })
  })
})
