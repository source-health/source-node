import { SourceInstance, resourceFactory, resourceNamespace } from '../factories'

import { AccountResource } from './Account'
import { CareTeamResource } from './CareTeam'
import { CareTeamRoleResource } from './CareTeamRole'
import { EventResource } from './Event'
import { FileResource } from './File'
import { GroupResource } from './Group'
import { MemberResource } from './Member'
import { QueueResource } from './Queue'
import { TaskResource } from './Task'
import { TaskDefinitionResource } from './TaskDefinition'
import { UserResource } from './User'
import { WebhookResource } from './Webhook'
import { MessageResource } from './communications/Message'
import { ThreadResource } from './communications/Thread'
import { DeviceResource } from './monitoring/Device'
import { MeasurementResource } from './monitoring/Measurement'
import { OrderResource } from './monitoring/Order'
import { AppointmentResource } from './scheduling/Appointment'
import { AppointmentTypeResource } from './scheduling/AppointmentType'
import { AvailabilityResource } from './scheduling/Availability'
import { SlotResource } from './scheduling/Slot'

export const allResources = resourceNamespace({
  accounts: resourceFactory(AccountResource),
  careTeams: resourceFactory(CareTeamResource),
  careTeamRoles: resourceFactory(CareTeamRoleResource),
  events: resourceFactory(EventResource),
  files: resourceFactory(FileResource),
  groups: resourceFactory(GroupResource),
  members: resourceFactory(MemberResource),
  queues: resourceFactory(QueueResource),
  tasks: resourceFactory(TaskResource),
  taskDefinitions: resourceFactory(TaskDefinitionResource),
  users: resourceFactory(UserResource),
  webhooks: resourceFactory(WebhookResource),
  scheduling: resourceNamespace({
    appointments: resourceFactory(AppointmentResource),
    appointmentTypes: resourceFactory(AppointmentTypeResource),
    availabilities: resourceFactory(AvailabilityResource),
    slots: resourceFactory(SlotResource),
  }),
  monitoring: resourceNamespace({
    devices: resourceFactory(DeviceResource),
    measurements: resourceFactory(MeasurementResource),
    orders: resourceFactory(OrderResource),
  }),
  communications: resourceNamespace({
    messages: resourceFactory(MessageResource),
    threads: resourceFactory(ThreadResource),
  }),
})
export type RootResources = SourceInstance<typeof allResources>
export * from './Account'
export * from './CareTeam'
export * from './CareTeamRole'
export * from './Event'
export * from './File'
export * from './Group'
export * from './Member'
export * from './Product'
export * from './Queue'
export * from './shared'
export * from './Task'
export * from './TaskDefinition'
export * from './User'
export * from './Webhook'
export * from './communications/Message'
export * from './communications/Thread'
export * from './monitoring/Device'
export * from './monitoring/DeviceModel'
export * from './monitoring/Measurement'
export * from './monitoring/Order'
export * from './scheduling/Appointment'
export * from './scheduling/AppointmentType'
export * from './scheduling/Availability'
export * from './scheduling/Slot'
