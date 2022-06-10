import { faker } from '@faker-js/faker'
import { omit } from 'lodash'
import { nanoid } from 'nanoid'

import { Source } from '../Source'
import { ApiKey } from '../authentication'
import { Member, MemberSexAtBirth, MemberUpdateParams } from '../resources'

import { setupAccount } from './data/account'
import { createMember } from './data/member'

describe('members', () => {
  let client: Source

  beforeAll(async () => {
    ;({ liveClient: client } = await setupAccount())
  })

  it('creates a member and can retrieve it', async () => {
    const params = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      date_of_birth: faker.date.birthdate().toISOString().split('T')[0],
      sex_at_birth: faker.helpers.arrayElement(['male', 'female']) as MemberSexAtBirth,
    }
    const member = await client.members.create(params)

    expect(member).toMatchObject(params)

    const retrieved = await client.members.retrieve(member.id)

    expect(omit(retrieved, 'response')).toStrictEqual(omit(member, 'response'))
  })

  it('updates a member', async () => {
    const member = await createMember(client)
    const updateParams: MemberUpdateParams = {
      last_name: faker.name.lastName() + nanoid(6),
      email: faker.internet.email(),
      pronouns: { value: 'he_him' },
    }

    const updated = await client.members.update(member.id, updateParams)

    expect(omit(updated, 'response')).toMatchObject({
      ...omit(member, 'response'),
      ...updateParams,
      updated_at: expect.toBeDateString() as string,
    })
  })

  it('lists members', async () => {
    await Promise.all([0, 1, 2, 3, 4].map(() => createMember(client)))

    const found = await client.members.list({ limit: 5 })

    expect(found.data).toHaveLength(5)
  })
})
