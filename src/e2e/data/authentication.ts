import NodeHttpClient from '../../adapter/NodeAdapter'

import { getBaseUrl } from './config'

interface GetTokenParams {
  subdomain: string
  email: string
  password: string
}

export async function getOwnerToken(params: GetTokenParams): Promise<string> {
  const adapter = new NodeHttpClient()
  interface UserToken {
    token: string
  }
  const ownerTokenResponse = await adapter.request<UserToken>({
    baseUrl: getBaseUrl(),
    path: '/v1/authenticate',
    method: 'POST',
    data: {
      ...params,
      type: 'user_credentials',
    },
    contentType: 'json',
  })

  return ownerTokenResponse.data.token
}
