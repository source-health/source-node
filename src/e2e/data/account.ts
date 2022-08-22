/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'

import { Source } from '../../Source'
import NodeHttpClient from '../../adapter/NodeAdapter'
import { ApiKeyAuthentication } from '../../authentication'
import { Account } from '../../resources'

import { getApiKeyId } from './api_keys'
import { getOwnerToken } from './authentication'
import { getBaseUrl } from './config'

export interface SetupAccountObject {
  subdomain: string
  liveApiKey: string
  testApiKey: string
  first_name: string
  last_name: string
  email: string
  password: string
  ownerToken: string
  client: Source
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
    name: faker.company.name(),
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

  const ownerToken = await getOwnerToken({
    subdomain: createAccountParams.subdomain,
    email: user.email,
    password: user.password,
  })

  const liveApiKeyId = await getApiKeyId(ownerToken, true)

  const client = new Source(
    new ApiKeyAuthentication(liveApiKeyId, response.data.live_secret_key!),
    {
      baseUrl,
    },
  )

  return {
    subdomain: response.data.subdomain,
    ...user,
    ownerToken,
    testApiKey: response.data.test_secret_key!,
    liveApiKey: response.data.live_secret_key!,
    client,
  }
}
