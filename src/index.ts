import { Catalyst } from './Catalyst'
import { ApiKey } from './authentication'
export * from './Catalyst'
export * from './Response'
export * from './resources'
export * from './authentication'
export * from './client'

async function main() {
  const client = new Catalyst(new ApiKey(''))

  const test = await client.member.list({
    email: 'andy@withcatalyst.com',
  })

  const foundMember = await client.member.retrieve(test.data[0].id)
  const updatedMember = await client.member.update(foundMember.id, {
    first_name: 'Andy',
  })
  console.log(foundMember, updatedMember)
}

main()
