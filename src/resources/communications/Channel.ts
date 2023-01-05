import { ContactPoint } from '../ContactPoint'

export interface Channel {
  /**
   * Always `channel`.
   */
  object: 'channel'
  /**
   * Unique ID of the channel.
   */
  id: string
  /**
   * The type of channel.
   */
  type: string
  /**
   * The name of this channel.
   */
  name: string
  /**
   * The contact point that represents the handle from which this channel
   * communicates.
   */
  contact: ContactPoint
  /**
   * The capabilities of this channel.
   */
  capabilities: ChannelCapabilities
  /**
   * Timestamp of when the channel was created.
   */
  created_at: string
  /**
   * Timestamp of when the channel was last updated.
   */
  updated_at: string
  /**
   * Timestamp of when the channel was deleted.
   */
  deleted_at?: string
}

export interface ChannelCapabilities {
  attachment_types: Array<string>
  rich_text: boolean
  max_length: number | null
}
