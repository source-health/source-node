/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'

import { Source } from '../../Source'
import NodeHttpClient from '../../adapter/NodeAdapter'
import { ApiKey } from '../../authentication'
import { Account } from '../../resources'

export interface SetupAccountObject {
  user: {
    first_name: string
    last_name: string
    email: string
    password: string
  }
  testApiKey: string
  liveApiKey: string
  subdomain: string
  liveClient: Source
  testClient: Source
}

export function getBaseUrl(): string {
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) {
    throw new Error('You must define BASE_URL environment variable to run these tests')
  }
  return baseUrl
}

/**
 * Use an undocumented test-only approach to create an account we can use for testing. This doesn't work in production.
 */
export async function setupAccount(): Promise<SetupAccountObject> {
  const baseUrl = getBaseUrl()
  const user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: `${faker.random.alphaNumeric(20)}@sourcehealth.com`,
    password: faker.internet.password(),
  }
  const createAccountParams = {
    subdomain: nanoid(),
    name: faker.company.companyName(),
    user,
  }

  const adapter = new NodeHttpClient()

  const response = await adapter.request<Account>({
    baseUrl,
    path: '/v1/accounts',
    method: 'POST',
    data: createAccountParams,
    contentType: 'json',
  })

  if (response.status > 299) {
    throw new Error(`Failed to create account: ${JSON.stringify(response.data)}`)
  }

  // Note: we don't actually use the API key ID
  const liveClient = new Source(new ApiKey('live', response.data.live_secret_key!), {
    baseUrl,
  })
  const testClient = new Source(new ApiKey('test', response.data.test_secret_key!), {
    baseUrl,
  })

  return {
    user,
    testApiKey: response.data.test_secret_key!,
    liveApiKey: response.data.live_secret_key!,
    subdomain: response.data.subdomain,
    liveClient,
    testClient,
  }
}
