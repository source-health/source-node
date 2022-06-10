import { faker } from '@faker-js/faker'

import { Source } from '../Source'
import { MemberSexAtBirth } from '../resources'

import { setupAccount } from './data/account'

describe('members', () => {
  let client: Source

  beforeAll(async () => {
    ;({ liveClient: client } = await setupAccount())
  })

  it('creates a member', async () => {
    const params = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      date_of_birth: faker.date.birthdate().toISOString().split('T')[0],
      sex_at_birth: faker.helpers.arrayElement(['male', 'female']) as MemberSexAtBirth,
    }
    const member = await client.members.create(params)

    expect(member).toMatchObject(params)
  })
})
