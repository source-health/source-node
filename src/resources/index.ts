import { SourceInstance, resourceFactory, resourceNamespace } from '../factories'

import { AccountResource } from './Account'
import { CareTeamResource } from './CareTeam'
import { CommentResource } from './Comment'
import { DocumentResource } from './Document'
import { EventResource } from './Event'
import { FieldResource } from './Field'
import { FileResource } from './File'
import { GroupResource } from './Group'
import { IntentResource } from './Intent'
import { LicenseResource } from './License'
import { LocationResource } from './Location'
import { MemberResource } from './Member'
import { NotificationPreferencesResource } from './NotificationPreferences'
import { QueueResource } from './Queue'
import { RelationshipResource } from './Relationship'
import { TagResource } from './Tag'
import { TaskResource } from './Task'
import { TaskDefinitionResource } from './TaskDefinition'
import { UserResource } from './User'
import { WebhookResource } from './Webhook'
import { CarePlanResource } from './clinical/CarePlan'
import { EncounterResource } from './clinical/Encounter'
import { EncounterTypeResource } from './clinical/EncounterType'
import { NoteResource } from './clinical/Note'
import { MessageResource } from './communications/Message'
import { ThreadResource } from './communications/Thread'
import { FormResource } from './forms/Form'
import { FormResponseResource } from './forms/FormResponse'
import { FormVersionResource } from './forms/FormVersion'
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
  comments: resourceFactory(CommentResource),
  documents: resourceFactory(DocumentResource),
  events: resourceFactory(EventResource),
  fields: resourceFactory(FieldResource),
  files: resourceFactory(FileResource),
  groups: resourceFactory(GroupResource),
  intents: resourceFactory(IntentResource),
  licenses: resourceFactory(LicenseResource),
  locations: resourceFactory(LocationResource),
  members: resourceFactory(MemberResource),
  notificationPreferences: resourceFactory(NotificationPreferencesResource),
  queues: resourceFactory(QueueResource),
  relationships: resourceFactory(RelationshipResource),
  tags: resourceFactory(TagResource),
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
  clinical: resourceNamespace({
    carePlans: resourceFactory(CarePlanResource),
    encounters: resourceFactory(EncounterResource),
    encounterTypes: resourceFactory(EncounterTypeResource),
    notes: resourceFactory(NoteResource),
  }),
  communications: resourceNamespace({
    messages: resourceFactory(MessageResource),
    threads: resourceFactory(ThreadResource),
  }),
  monitoring: resourceNamespace({
    devices: resourceFactory(DeviceResource),
    measurements: resourceFactory(MeasurementResource),
    orders: resourceFactory(OrderResource),
  }),
  forms: resourceNamespace({
    forms: resourceFactory(FormResource),
    formResponses: resourceFactory(FormResponseResource),
    formVersions: resourceFactory(FormVersionResource),
  }),
})
export type RootResources = SourceInstance<typeof allResources>
export * from './Account'
export * from './ApiKey'
export * from './CareTeam'
export * from './Comment'
export * from './CompoundConditional'
export * from './ConcreteConditional'
export * from './Conditional'
export * from './ContactPoint'
export * from './Document'
export * from './Error'
export * from './Event'
export * from './Field'
export * from './File'
export * from './Group'
export * from './Integration'
export * from './Intent'
export * from './License'
export * from './Location'
export * from './Member'
export * from './NoteContentNode'
export * from './NotificationPreferences'
export * from './Product'
export * from './Question'
export * from './Queue'
export * from './Relationship'
export * from './shared'
export * from './Tag'
export * from './Task'
export * from './TaskDefinition'
export * from './TaskQueueEntry'
export * from './ThreadStatus'
export * from './User'
export * from './Webhook'
export * from './WebhookEvents'
export * from './clinical/CarePlan'
export * from './clinical/Encounter'
export * from './clinical/EncounterType'
export * from './clinical/Note'
export * from './clinical/NoteVersion'
export * from './communications/Channel'
export * from './communications/Message'
export * from './communications/Thread'
export * from './forms/Form'
export * from './forms/FormResponse'
export * from './forms/FormVersion'
export * from './monitoring/Device'
export * from './monitoring/DeviceModel'
export * from './monitoring/Measurement'
export * from './monitoring/Order'
export * from './scheduling/Appointment'
export * from './scheduling/AppointmentType'
export * from './scheduling/Availability'
export * from './scheduling/RecurringSlot'
export * from './scheduling/Slot'
