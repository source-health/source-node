import { faker } from '@faker-js/faker'

import { Source } from '../../Source'
import { Token } from '../../authentication'
import { Member, MemberSexAtBirth } from '../../resources'

import { getBaseUrl } from './config'

export async function createMember(client: Source): Promise<Member> {
  const params = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    date_of_birth: faker.date.birthdate().toISOString().split('T')[0],
    sex_at_birth: faker.helpers.arrayElement(['male', 'female']) as MemberSexAtBirth,
  }
  return await client.members.create(params)
}

export async function getMemberClient(client: Source, member: Member): Promise<Source> {
  const jwt = await client.tokens.generate({
    member: member.id,
    expiration: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
  })
  return new Source(new Token(jwt), { baseUrl: getBaseUrl() })
}
