import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Expandable } from '../shared'

import { FormVersion } from './FormVersion'

export interface Form {
  /**
   * Always `form`.
   */
  object: 'form'
  /**
   * Unique ID for the form.
   */
  id: string
  /**
   * Unique key for this form. You can use this when creating form responses via the
   * API. In order to avoid potential confusion when distinguishing between form IDs
   * and form keys, keys must not start with `form_`.
   */
  key: string
  /**
   * Description of this form. This description will be shown to responders when
   * attempting to respond to this form. While not required, it can be helpful to
   * share details about the form's purpose.
   */
  name: string
  /**
   * Description of this form
   */
  description: string | null
  /**
   * Whether or not this form can be directly accessed by a public responder. For
   * example, set public to true for a public-facing intake form that should be
   * accessible to anyone.
   */
  public: boolean
  /**
   * The current published version of the form that new responses are created
   * against. Automatically set to the latest published version when publishing a
   * form version.
   */
  published_version: Expandable<FormVersion> | null
  /**
   * Most recently created version of the form. Always the current draft version.
   */
  latest_version: Expandable<FormVersion> | null
  /**
   * The encounter type for the encounter that Source creates automatically when a
   * response to this form is submitted. If this field is null, an encounter is not
   * created automatically for each form response.
   */
  encounter_type: string | null
  /**
   * Timestamp when the form was created.
   */
  created_at: string
  /**
   * Timestamp when the form was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the form was archived.
   */
  archived_at: string | null
}

export interface FormListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Form>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface FormListParams {
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
   * Sort field for the results. A '-' prefix indicates sorting by that field in
   * descending order, otherwise the order will be ascending.
   */
  sort?: FormListParamsSort
  /**
   * Limit results to forms with name containing the given query.
   */
  name?: string
  /**
   * Filter forms by archived or unarchived.
   */
  archived?: boolean
  /**
   * Filter forms by published or unpublished.
   */
  published?: boolean
}

export type FormListParamsSort = 'name' | 'created_at' | '-name' | '-created_at'

export interface FormCreateParams {
  /**
   * Unique key for this form. You can use this when creating form responses via the
   * API. In order to avoid potential confusion when distinguishing between form IDs
   * and form keys, keys must not start with `form_`.
   */
  key: string
  /**
   * Description of this form. This description will be shown to responders when
   * attempting to respond to this form. While not required, it can be helpful to
   * share details about the form's purpose.
   */
  name: string
  /**
   * Description of this form
   */
  description?: string | null
  /**
   * Whether or not this form can be directly accessed by a public responder. For
   * example, set public to true for a public-facing intake form that should be
   * accessible to anyone.
   */
  public?: boolean
  /**
   * The encounter type for the encounter that Source creates automatically when a
   * response to this form is submitted. If this field is null, an encounter is not
   * created automatically for each form response.
   */
  encounter_type?: FormCreateParamsEncounterType
}

export type FormCreateParamsEncounterType = string

export interface FormUpdateParams {
  /**
   * Unique key for this form. You can use this when creating form responses via the
   * API. In order to avoid potential confusion when distinguishing between form IDs
   * and form keys, keys must not start with `form_`.
   */
  key?: string
  /**
   * Description of this form. This description will be shown to responders when
   * attempting to respond to this form. While not required, it can be helpful to
   * share details about the form's purpose.
   */
  name?: string
  /**
   * Description of this form
   */
  description?: string | null
  /**
   * The encounter type for the encounter that Source creates automatically when a
   * response to this form is submitted. If this field is null, an encounter is not
   * created automatically for each form response.
   */
  encounter_type?: FormUpdateParamsEncounterType | null
}

export type FormUpdateParamsEncounterType = string

export class FormResource extends Resource {
  /**
   * Returns a list of forms within the current account. The forms returned are
   * sorted by creation date, with the most recently added form appearing first.
   */
  public list(params?: FormListParams, options?: SourceRequestOptions): Promise<FormListResponse> {
    return this.source.request('GET', '/v1/forms', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new form with a single draft form version. After creating a form, you
   * can use the update draft version endpoint to modify the form's contents.
   */
  public create(params: FormCreateParams, options?: SourceRequestOptions): Promise<Form> {
    return this.source.request('POST', '/v1/forms', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing form. You need only supply the unique form
   * identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Form> {
    return this.source.request('GET', `/v1/forms/${id}`, {
      options,
    })
  }

  /**
   * Updates a form. You can update the name, key, or description of a form. Updates
   * to these fields affect all versions of the form.
   */
  public update(
    id: string,
    params?: FormUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Form> {
    return this.source.request('POST', `/v1/forms/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Archives a specified form. Once archived, it can no longer be used to generate
   * new form responses.  Existing form responses are not affected when a form is
   * archived.
   */
  public archive(id: string, options?: SourceRequestOptions): Promise<Form> {
    return this.source.request('POST', `/v1/forms/${id}/archive`, {
      contentType: 'json',
      options,
    })
  }

  /**
   * Unarchives the specified form. Once unarchived, the form's published version can
   * be again accessed to create form responses and the draft version of the form can
   * be edited.
   */
  public unarchive(id: string, options?: SourceRequestOptions): Promise<Form> {
    return this.source.request('POST', `/v1/forms/${id}/unarchive`, {
      contentType: 'json',
      options,
    })
  }
}
