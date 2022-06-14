import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { CompoundConditional } from '../CompoundConditional'
import { EarlyExitPoint } from '../EarlyExitPoint'
import { Question } from '../Question'
import { Expandable } from '../shared'

import { Form } from './Form'

export interface FormVersionItemItem0Item1 {
  type: 'display'
  display_type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * A conditional statement - if it evaluates to true, this element will be
   * displayed, if false the element will not be displayed.
   */
  conditional?: CompoundConditional
}

export type FormVersionItemItem0Item = Question | FormVersionItemItem0Item1 | EarlyExitPoint

export interface FormVersionItemItem0 {
  type: 'group'
  /**
   * Array of form items, such as questions and display elements.
   */
  items: Array<FormVersionItemItem0Item>
  /**
   * A conditional statement - if it evaluates to true, this group will be displayed,
   * if false the items inside this group will not be displayed.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem2 {
  type: 'display'
  display_type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * A conditional statement - if it evaluates to true, this element will be
   * displayed, if false the element will not be displayed.
   */
  conditional?: CompoundConditional
}

export type FormVersionItemItem =
  | FormVersionItemItem0
  | Question
  | FormVersionItemItem2
  | EarlyExitPoint

export interface FormVersionItem {
  type: 'page'
  /**
   * Array of form elements. Pages can include any element, except another page.
   */
  items: Array<FormVersionItemItem>
  /**
   * A conditional statement - if it evaluates to true, this group will be displayed,
   * if false the items inside this group will not be displayed.
   */
  conditional?: CompoundConditional
}

export interface FormVersionExitScreen {
  type: 'exit_screen'
  /**
   * A unique key for this exit screen within the form. The keys are used in early
   * exit points to indicate which screen is used for the early exit. An exit screen
   * with key 'default' must exist in every form.
   */
  key: string
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
}

export interface FormVersion {
  /**
   * Always `form_version`.
   */
  object: 'form_version'
  /**
   * Unique ID for the form version.
   */
  id: string
  /**
   * Unique ID for the parent form of this form version.
   */
  form: Expandable<Form>
  /**
   * Description of changes within this form version. You can use the changelog to
   * describe the updates you are making within this form version relative to
   * previous versions. The changelog is not visible to members and responders to the
   * form.
   */
  changelog: string | null
  /**
   * Version number of this form version. The version number is automatically
   * incremented when you publish a form version and a new draft version is created.
   */
  version: number
  /**
   * The previous form version. You can expand the previous form version to view its
   * contents and configuration without the need to look up the form version
   * separately.
   */
  previous_version: Expandable<FormVersion> | null
  /**
   * An array of items that describe the form version's content and configuration.
   * Pages form the top-level item and contain additional elements, such as
   * questions, display elements, early exit points, and groups of items.
   */
  items: Array<FormVersionItem>
  /**
   * A map of 'key' to exit screen content. Each form must contain an exit screen
   * with the key 'default', and additional exit screens can be configured and
   * referenced by early exit points within the form.
   */
  exit_screens: Array<FormVersionExitScreen>
  /**
   * Timestamp when the form version was created.
   */
  created_at: string
  /**
   * Timestamp when the form version was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the form version was published.
   */
  published_at: string | null
}

export interface FormVersionLatestParamsItemItem0Item1 {
  type: 'display'
  display_type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * A conditional statement - if it evaluates to true, this element will be
   * displayed, if false the element will not be displayed.
   */
  conditional?: CompoundConditional
}

export type FormVersionLatestParamsItemItem0Item =
  | Question
  | FormVersionLatestParamsItemItem0Item1
  | EarlyExitPoint

export interface FormVersionLatestParamsItemItem0 {
  type: 'group'
  /**
   * Array of form items, such as questions and display elements.
   */
  items: Array<FormVersionLatestParamsItemItem0Item>
  /**
   * A conditional statement - if it evaluates to true, this group will be displayed,
   * if false the items inside this group will not be displayed.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem2 {
  type: 'display'
  display_type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * A conditional statement - if it evaluates to true, this element will be
   * displayed, if false the element will not be displayed.
   */
  conditional?: CompoundConditional
}

export type FormVersionLatestParamsItemItem =
  | FormVersionLatestParamsItemItem0
  | Question
  | FormVersionLatestParamsItemItem2
  | EarlyExitPoint

export interface FormVersionLatestParamsItem {
  type: 'page'
  /**
   * Array of form elements. Pages can include any element, except another page.
   */
  items: Array<FormVersionLatestParamsItemItem>
  /**
   * A conditional statement - if it evaluates to true, this group will be displayed,
   * if false the items inside this group will not be displayed.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsExitScreen {
  type: 'exit_screen'
  /**
   * A unique key for this exit screen within the form. The keys are used in early
   * exit points to indicate which screen is used for the early exit. An exit screen
   * with key 'default' must exist in every form.
   */
  key: string
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
}

export interface FormVersionLatestParams {
  /**
   * Description of changes within this form version. You can use the changelog to
   * describe the updates you are making within this form version relative to
   * previous versions. The changelog is not visible to members and responders to the
   * form.
   */
  changelog?: string | null
  /**
   * An array of items that describe the form version's content and configuration.
   * Pages form the top-level item and contain additional elements, such as
   * questions, display elements, early exit points, and groups of items.
   */
  items: Array<FormVersionLatestParamsItem>
  /**
   * A map of early exit point keys to exit screen content. Each form version must
   * contain an exit screen with the key 'default', and additional exit screens can
   * be configured and referenced by early exit points within the form version.
   */
  exit_screens: Array<FormVersionLatestParamsExitScreen>
}

export interface FormVersionLatestPublishParams {
  /**
   * If provided, publishing succeeds only if 'last_updated_at' matches Source's
   * record for the form version's 'updated_at'. Providing this parameter prevents
   * accidentally publishing updates made to the form version in the meantime.
   */
  last_updated_at?: string
}

export interface FormVersionListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<FormVersion>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface FormVersionListParams {
  /**
   * A cursor for use in pagination. `ending_before` is an object ID that defines
   * your place in the list. For instance, if you make a list request and receive 100
   * objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  ending_before?: string
  /**
   * A cursor for use in pagination. `starting_after` is an object ID that defines
   * your place in the list. For instance, if you make a list request and receive 100
   * objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  starting_after?: string
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100.
   */
  limit?: number
  /**
   * Filter by published or unpublished form versions.
   */
  published?: boolean
}

export class FormVersionResource extends Resource {
  /**
   * Updates a form version. If there is no draft version of the form, a new draft
   * version is created with the parameters provided.
   */
  public latest(
    form: string,
    params: FormVersionLatestParams,
    options?: SourceRequestOptions,
  ): Promise<FormVersion> {
    return this.source.request('POST', `/v1/forms/${form}/versions/latest`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Publishes the form version, preventing any further changes. Once a version has
   * been published it cannot be unpublished. Once published, the version becomes the
   * form's published version and is used for all new responses.
   */
  public latestPublish(
    form: string,
    params?: FormVersionLatestPublishParams,
    options?: SourceRequestOptions,
  ): Promise<FormVersion> {
    return this.source.request('POST', `/v1/forms/${form}/versions/latest/publish`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing form version.  Use 'latest' to retrieve the
   * latest version of the form, which is always the current draft version of the
   * form, or 'published' to retrieve the latest published version, which is the
   * version in use for any new response.
   */
  public retrieve(form: string, id: string, options?: SourceRequestOptions): Promise<FormVersion> {
    return this.source.request('GET', `/v1/forms/${form}/versions/${id}`, {
      options,
    })
  }

  /**
   * Returns a list of forms versions. The form versions returned are sorted by
   * creation date, with the most recently added form version appearing first.
   */
  public list(
    form: string,
    params?: FormVersionListParams,
    options?: SourceRequestOptions,
  ): Promise<FormVersionListResponse> {
    return this.source.request('GET', `/v1/forms/${form}/versions`, {
      query: params,
      options,
    })
  }
}
