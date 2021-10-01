import { SourceInstance, resourceFactory, resourceNamespace } from '../factories'

import { AccountResource } from './Account'
import { CareTeamResource } from './CareTeam'
import { EventResource } from './Event'
import { FileResource } from './File'
import { MemberResource } from './Member'
import { TaskResource } from './Task'
import { TaskDefinitionResource } from './TaskDefinition'
import { UserResource } from './User'
import { WebhookResource } from './Webhook'
import { MessageResource } from './communications/Message'
import { ThreadResource } from './communications/Thread'
import { DeviceResource } from './monitoring/Device'
import { MeasurementResource } from './monitoring/Measurement'
import { OrderResource } from './monitoring/Order'

export const allResources = resourceNamespace({
  accounts: resourceFactory(AccountResource),
  users: resourceFactory(UserResource),
  careTeams: resourceFactory(CareTeamResource),
  members: resourceFactory(MemberResource),
  taskDefinitions: resourceFactory(TaskDefinitionResource),
  tasks: resourceFactory(TaskResource),
  events: resourceFactory(EventResource),
  webhooks: resourceFactory(WebhookResource),
  files: resourceFactory(FileResource),
  communications: resourceNamespace({
    messages: resourceFactory(MessageResource),
    threads: resourceFactory(ThreadResource),
  }),
  monitorings: resourceNamespace({
    devices: resourceFactory(DeviceResource),
    measurements: resourceFactory(MeasurementResource),
    orders: resourceFactory(OrderResource),
  }),
})
export type RootResources = SourceInstance<typeof allResources>
