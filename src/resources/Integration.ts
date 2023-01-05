import { User } from './User'
import { Expandable } from './shared'

export interface Integration {
  /**
   * Always `integration`.
   */
  object: 'integration'
  id: string
  /**
   * Expandable reference to a User
   */
  user: Expandable<User> | null
  type: IntegrationType
  enabled: boolean
  config: IntegrationConfig | null
  /**
   * The corresponding ID of this integration in the external system.
   */
  external_id: string | null
  /**
   * Timestamp of when the integration was created.
   */
  created_at: string
  /**
   * Timestamp of when the integration was last updated.
   */
  updated_at: string
}

export type IntegrationType = 'cronofy' | 'canvas'

export interface IntegrationConfig {
  type: 'canvas'
  /**
   * The URL of the Canvas instance FHIR API to connect to.
   */
  api_base_url: string
  /**
   * The URL of the Canvas instance web application to connect to.
   */
  web_base_url: string
}
