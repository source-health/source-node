import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { File } from './File'
import { Expandable } from './shared'

export interface Account {
  /**
   * Always `account`.
   */
  object: 'account'
  /**
   * Unique ID of the account.
   */
  id: string
  /**
   * Name for the account.
   */
  name: string
  /**
   * Subdomain for the account.
   */
  subdomain: string
  /**
   * Pointer to the file that should be used as the logo for this account
   */
  logo: Expandable<File> | null
  /**
   * The time zone associated with this account. This value is rarely used in Source,
   * however it serves an important purpose for appointment booking. In order to
   * ensure each day has consistent appointment slots available, we use this time
   * zone to determine when midnight is for your organization. Slots will reset when
   * crossing midnight into the next day. You can read more about this in the
   * documentation for the [Slot resource](../slot/).
   */
  time_zone: string
  /**
   * Theme settings to apply when using Source-hosted elements.
   */
  theme: AccountTheme
  /**
   * Test mode API secret key for the account, only returned during account creation.
   */
  test_secret_key?: string
  /**
   * Live mode API secret key for the account, only returned during account creation.
   */
  live_secret_key?: string
  /**
   * Timestamp when the account was created.
   */
  created_at: string
  /**
   * Timestamp when the account was last updated.
   */
  updated_at: string
}

export interface AccountTheme {
  /**
   * Brand colors used throughout the application.
   */
  colors: AccountThemeColors
  /**
   * Brand settings that affect the shape of elements.
   */
  shapes: AccountThemeShapes
}

export interface AccountThemeColors {
  /**
   * Color hex for the primary interface elements such as buttons.
   */
  primary: string | null
  /**
   * Color hex for text that appears on primary interface elements.
   */
  primary_text: string | null
  /**
   * Color hex for the accent elements like checkboxes, radio buttons, links, and
   * similar second-level indications.
   */
  accent: string | null
  /**
   * Color hex for text that appears on accent interface elements.
   */
  accent_text: string | null
  /**
   * Color hex for the color of the primary page background.
   */
  surface: string | null
  /**
   * Color hex for the text that appears directly on the primary surface.
   */
  surface_text: string | null
  /**
   * Color hex for the background color of elements sitting on the surface, such as a
   * card.
   */
  component: string | null
  /**
   * Color hex for the text that appears within a component element.
   */
  component_text: string | null
  /**
   * Color hex for the border color on interactive elements.
   */
  border: string | null
}

export interface AccountThemeShapes {
  /**
   * Border radius, defined in pixels.
   */
  border_radius: string | null
  /**
   * Whether or not to enable default shadows on elements.
   */
  shadows: boolean
}

export interface AccountUpdateParams {
  /**
   * Name for the account.
   */
  name?: string
  /**
   * Subdomain for the account.
   */
  subdomain?: string
  /**
   * The time zone identifier for this account. Account level time zone identifiers
   * are used to determine when "midnight" exists for your practice, and feed into
   * Source's understanding of your organization's business hours. Note that each
   * user has their own time zone as well, which is what is used when declaring user
   * availability and booking appointments.
   */
  time_zone?: string
  /**
   * Theme configuration to apply to the account.
   */
  theme?: AccountUpdateParamsTheme
  /**
   * Pointer to the file to use as the logo for this account. Must be of purpose
   * account_logo.
   */
  logo?: string | null
}

export interface AccountUpdateParamsTheme {
  /**
   * Brand colors used throughout the application.
   */
  colors: AccountUpdateParamsThemeColors
  /**
   * Brand settings that affect the shape of elements.
   */
  shapes: AccountUpdateParamsThemeShapes
}

export interface AccountUpdateParamsThemeColors {
  /**
   * Color hex for the primary interface elements such as buttons.
   */
  primary: string | null
  /**
   * Color hex for text that appears on primary interface elements.
   */
  primary_text: string | null
  /**
   * Color hex for the accent elements like checkboxes, radio buttons, links, and
   * similar second-level indications.
   */
  accent: string | null
  /**
   * Color hex for text that appears on accent interface elements.
   */
  accent_text: string | null
  /**
   * Color hex for the color of the primary page background.
   */
  surface: string | null
  /**
   * Color hex for the text that appears directly on the primary surface.
   */
  surface_text: string | null
  /**
   * Color hex for the background color of elements sitting on the surface, such as a
   * card.
   */
  component: string | null
  /**
   * Color hex for the text that appears within a component element.
   */
  component_text: string | null
  /**
   * Color hex for the border color on interactive elements.
   */
  border: string | null
}

export interface AccountUpdateParamsThemeShapes {
  /**
   * Border radius, defined in pixels.
   */
  border_radius: string | null
  /**
   * Whether or not to enable default shadows on elements.
   */
  shadows: boolean
}

export class AccountResource extends Resource {
  /**
   * Retrieves the details of an account.
   *
   * Supply the unique identifier of the account, or `current` to access your current
   * account.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Account> {
    return this.source.request('GET', `/v1/accounts/${id}`, {
      options,
    })
  }

  /**
   * Updates an account. At this time you can only update the account name and
   * subdomain.
   *
   * Any parameters that are not provided in the request will be left unchanged.
   */
  public update(
    id: string,
    params?: AccountUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Account> {
    return this.source.request('POST', `/v1/accounts/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
