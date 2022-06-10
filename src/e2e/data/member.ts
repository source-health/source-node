import { faker } from '@faker-js/faker'

import { Source } from '../../Source'
import { Member, MemberSexAtBirth } from '../../resources'

export async function createMember(client: Source): Promise<Member> {
  const params = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    date_of_birth: faker.date.birthdate().toISOString().split('T')[0],
    sex_at_birth: faker.helpers.arrayElement(['male', 'female']) as MemberSexAtBirth,
  }
  return await client.members.create(params)
}
