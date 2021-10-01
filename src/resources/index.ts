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

export const allResources = {
  accounts: AccountResource,
  users: UserResource,
  careTeams: CareTeamResource,
  members: MemberResource,
  messages: MessageResource,
  threads: ThreadResource,
  taskDefinitions: TaskDefinitionResource,
  tasks: TaskResource,
  devices: DeviceResource,
  events: EventResource,
  webhooks: WebhookResource,
  files: FileResource,
  measurements: MeasurementResource,
  orders: OrderResource,
}
