import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Member } from './Member'
import { User } from './User'
import { Expandable } from './shared'

export interface NotificationPreferences {
  /**
   * Always `notification_preferences`.
   */
  object: 'notification_preferences'
  /**
   * The recipient to which these preferences belong.
   */
  recipient: Expandable<Member | User>
  /**
   * The settings for all notifications that apply to the recipient type. Each
   * notification will have a key in this dictionary, and the value will be the
   * configuration for that notification.
   */
  notifications: Record<string, unknown>
}

export interface NotificationPreferencesUpdateForMemberParams {
  notifications: Record<string, unknown>
}

export interface NotificationPreferencesUpdateForUserParams {
  notifications: Record<string, unknown>
}

export class NotificationPreferencesResource extends Resource {
  public retrieveForMember(
    recipient: string,
    options?: SourceRequestOptions,
  ): Promise<NotificationPreferences> {
    return this.source.request('GET', `/v1/members/${recipient}/notification_preferences`, {
      options,
    })
  }

  public updateForMember(
    recipient: string,
    params: NotificationPreferencesUpdateForMemberParams,
    options?: SourceRequestOptions,
  ): Promise<NotificationPreferences> {
    return this.source.request('POST', `/v1/members/${recipient}/notification_preferences`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  public retrieveForUser(
    recipient: string,
    options?: SourceRequestOptions,
  ): Promise<NotificationPreferences> {
    return this.source.request('GET', `/v1/users/${recipient}/notification_preferences`, {
      options,
    })
  }

  public updateForUser(
    recipient: string,
    params: NotificationPreferencesUpdateForUserParams,
    options?: SourceRequestOptions,
  ): Promise<NotificationPreferences> {
    return this.source.request('POST', `/v1/users/${recipient}/notification_preferences`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
