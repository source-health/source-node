import { faker } from '@faker-js/faker'
import { omit } from 'lodash'
import { nanoid } from 'nanoid'

import { Source } from '../Source'
import { MemberSexAtBirth, MemberUpdateParams } from '../resources'

import { setupAccount } from './data/account'
import { createMember, getMemberClient } from './data/member'

describe('members', () => {
  let client: Source

  beforeAll(async () => {
    ;({ client } = await setupAccount())
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

    // main API keys client can retrieve the member
    const retrieved = await client.members.retrieve(member.id)

    expect(omit(retrieved, 'response')).toStrictEqual(omit(member, 'response'))

    // Member client can retrieve its own member
    const memberClient = await getMemberClient(client, member)
    const self = await memberClient.members.retrieve(member.id)
    expect(omit(self, 'response')).toStrictEqual(omit(member, 'response'))
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

  it('can act as authorized member on subject member', async () => {
    const subject = await createMember(client)
    const authorized = await createMember(client)
    const authorizedMemberClient = await getMemberClient(client, subject, authorized)

    // At first, this won't work, since they don't have a relationship.
    await expect(async () => {
      await authorizedMemberClient.members.retrieve(subject.id)
    }).rejects.toThrowError(/a subject and actor who do not have a preexisting relationship/)

    // If we create the relationship, it will work.
    await client.relationships.create({
      subject_member: subject.id,
      authorized_member: authorized.id,
      type: 'mother',
      status: 'active',
    })

    const retrievedSubject = await authorizedMemberClient.members.retrieve(subject.id)

    expect(omit(retrievedSubject, 'response')).toStrictEqual(omit(subject, 'response'))
  })
})
