import { Source } from '../Source'
import { ApiKeyAuthentication } from '../authentication'

describe('TokenGenerator', () => {
  let client: Source
  let expiration: Date

  beforeAll(() => {
    client = new Source(
      new ApiKeyAuthentication(
        'key_123',
        'sk_secret_that_is_at_least_256_bits_long_so_that_it_works',
      ),
    )
    expiration = new Date(Date.now() + 1000 * 60 * 5) // 5 minutes
  })

  it('can use deprecated member param to generate token', async () => {
    const jwt = await client.tokens.generate({
      member: 'mem_123',
      expiration,
    })

    expect(jwt).toBeString()
  })

  it('does not allow deprecated member param to generate token', async () => {
    await expect(async () => {
      await client.tokens.generate({
        member: 'mem_123',
        actor: 'mem_456',
        expiration,
      })
    }).rejects.toThrowError(
      "The 'member' token option is deprecated and cannot be combined with 'subject' or 'actor' options",
    )

    await expect(async () => {
      await client.tokens.generate({
        member: 'mem_123',
        subject: 'mem_456',
        expiration,
      })
    }).rejects.toThrowError(
      "The 'member' token option is deprecated and cannot be combined with 'subject' or 'actor' options",
    )
  })
})
