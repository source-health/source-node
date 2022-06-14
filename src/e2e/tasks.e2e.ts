import { faker } from '@faker-js/faker'
import { omit } from 'lodash'
import { nanoid } from 'nanoid'

import { Source } from '../Source'

import { setupAccount } from './data/account'
import { createMember } from './data/member'

describe('tasks', () => {
  let client: Source

  beforeAll(async () => {
    ;({ client } = await setupAccount())
  })

  it('can create a task and then resolve it', async () => {
    const member = await createMember(client)

    const taskDefinition = await client.taskDefinitions.create({
      name: faker.lorem.word(),
      key: nanoid(),
    })

    const task = await client.tasks.create({
      member: member.id,
      definition: taskDefinition.id,
      summary: faker.lorem.sentence(),
      status: 'open',
    })

    expect(task).toMatchObject({
      member: member.id,
      definition: taskDefinition.id,
      status: 'open',
    })

    // Check we can read it back
    const retrieved = await client.tasks.retrieve(task.id)

    expect(omit(retrieved, 'response')).toStrictEqual(omit(task, 'response'))

    // Check we can resolve the task
    const resolved = await client.tasks.update(task.id, { status: 'resolved' })

    expect(resolved).toMatchObject({
      status: 'resolved',
    })
  })
})
