import { createUrl, toUrlEncoded } from './utils'

describe('createUrl', () => {
  it('should append to base URL', () => {
    expect(createUrl('https://api.sourcehealth.com', '/v1/test').toString()).toEqual(
      'https://api.sourcehealth.com/v1/test',
    )
  })

  it('should carry over query params', () => {
    expect(
      createUrl('https://api.sourcehealth.com', '/v1/test?starting_after=foo').toString(),
    ).toEqual('https://api.sourcehealth.com/v1/test?starting_after=foo')
  })

  it('should apply base query params', () => {
    expect(
      createUrl('https://api.sourcehealth.com', '/v1/test', { starting_after: 'foo' }).toString(),
    ).toEqual('https://api.sourcehealth.com/v1/test?starting_after=foo')
  })

  it('should append query params to existing ones', () => {
    expect(
      createUrl('https://api.sourcehealth.com', '/v1/test?limit=100', {
        starting_after: 'foo',
      }).toString(),
    ).toEqual('https://api.sourcehealth.com/v1/test?limit=100&starting_after=foo')
  })
})

describe('toUrlEncoded', () => {
  it('should encode correctly', () => {
    expect(toUrlEncoded({ key: 'value' })).toEqual({ key: 'value' })
    expect(toUrlEncoded({ key: ['value1', 'value2'] })).toEqual({
      'key[0]': 'value1',
      'key[1]': 'value2',
    })
  })
})
