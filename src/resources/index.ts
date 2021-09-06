import type { Catalyst } from '../Catalyst'

import { AccountContext } from './Account'
import { CareTeamContext } from './CareTeam'
import { DeviceContext } from './Device'
import { EventContext } from './Event'
import { MeasurementContext } from './Measurement'
import { MemberContext } from './Member'
import { OrderContext } from './Order'
import { TaskContext } from './Task'
import { TaskDefinitionContext } from './TaskDefinition'
import { ThreadContext } from './Thread'
import { UserContext } from './User'
import { WebhookContext } from './Webhook'

export const allResources = {
  account: AccountContext,
  user: UserContext,
  care_team: CareTeamContext,
  member: MemberContext,
  thread: ThreadContext,
  device: DeviceContext,
  event: EventContext,
  webhook: WebhookContext,
  measurement: MeasurementContext,
  order: OrderContext,
  task: TaskContext,
  task_definition: TaskDefinitionContext,
}

type ResourceTypes = typeof allResources
export type ResourceRoot = {
  [K in keyof ResourceTypes]: ResourceTypes[K] extends new (client: Catalyst) => infer R ? R : never
}

export { AccountContext }
export { UserContext }
export { CareTeamContext }
export { MemberContext }
export { ThreadContext }
export { DeviceContext }
export { EventContext }
export { WebhookContext }
export { MeasurementContext }
export { OrderContext }
export { TaskContext }
export { TaskDefinitionContext }
