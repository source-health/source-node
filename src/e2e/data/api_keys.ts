import NodeHttpClient from '../../adapter/NodeAdapter'

import { getBaseUrl } from './config'

export async function getApiKeyId(ownerToken: string, liveMode: boolean): Promise<string> {
  const adapter = new NodeHttpClient()
  interface ApiKeys {
    data: {
      id: string
    }[]
  }
  const apiKeysResponse = await adapter.request<ApiKeys>({
    baseUrl: getBaseUrl(),
    path: '/v1/api_keys',
    method: 'GET',
    contentType: 'json',
    headers: {
      Authorization: `Bearer ${ownerToken}`,
      'Catalyst-Live-Mode': liveMode ? 'true' : 'false',
    },
  })
  return apiKeysResponse.data.data[0].id
}
