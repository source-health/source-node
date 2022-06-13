import { Source } from '../Source'
import { User } from '../resources'

import { setupAccount } from './data/account'
import { createMember, getMemberClient } from './data/member'

describe('communications', () => {
  let client: Source
  let owner: User

  beforeAll(async () => {
    let email: string
    ;({ client, email } = await setupAccount())
    owner = (await client.users.list({ email })).data[0]
  })

  it('can impersonate owner and converse with member', async () => {
    const member = await createMember(client)

    const thread = await client.communications.threads.create({
      member: member.id,
      message: {
        text: 'Hello world',
        sender: owner.id,
      },
    })

    const memberClient = await getMemberClient(client, member)

    const memberMessage = await memberClient.communications.messages.create({
      thread: thread.id,
      text: 'Oh, hai!',
    })

    const allMessages = await client.communications.messages.list(
      {
        thread: thread.id,
      },
      { expand: ['data.sender'] },
    )

    expect(allMessages.data).toHaveLength(2)
    expect(allMessages.data[0]).toMatchObject({
      text: memberMessage.text,
      sender: {
        id: member.id,
      },
    })
    expect(allMessages.data[1]).toMatchObject({
      text: 'Hello world',
      sender: {
        id: owner.id,
      },
    })
  })
})
