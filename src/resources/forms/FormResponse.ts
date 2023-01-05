import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { Question } from '../Question'
import { Expandable } from '../shared'

import { Form } from './Form'
import { FormVersion } from './FormVersion'

export interface FormResponse {
  /**
   * Always `form_response`.
   */
  object: 'form_response'
  /**
   * Unique ID for the form response.
   */
  id: string
  /**
   * Author of this form response. Source infers the author from the actor who
   * creates the response, such as the member ID for a response created using a
   * member token.
   */
  author: string
  /**
   * Member to which the form response belongs. Members can only view responses that
   * are associated with them or with a member whose data they are authorized to
   * access via a relationship.
   */
  member: Expandable<Member> | null
  /**
   * The form associated with this form response.
   */
  form: Expandable<Form>
  /**
   * The version of the form associated with this form response.  The form version
   * associated with the response cannot be changed after creation. Any updates to
   * this response relate to this same form version.
   */
  form_version: Expandable<FormVersion>
  /**
   * The individual responses that capture the author's answers to corresponding
   * items within the form version.,
   */
  responses: Array<FormResponseResponse>
  /**
   * Current status of this form response. By default, newly created form responses
   * use the 'started' status.  When a form is submitted, the status changes to
   * 'completed'.
   */
  status: FormResponseStatus
  /**
   * The exit screen the author reached, if any. Forms support conditional exits that
   * appear based on the author's responses. If the author reaches an exit during the
   * response, the exit screen is specified here.
   */
  exit_screen: FormResponseExitScreen | null
  /**
   * Timestamp when the form response was created.
   */
  created_at: string
  /**
   * Timestamp when the form response was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the form response was submitted.
   */
  completed_at: string | null
}

export interface FormResponseResponse {
  item: Question
  response: unknown
  value: unknown
}

export type FormResponseStatus = 'not_started' | 'started' | 'completed'

export interface FormResponseExitScreen {
  type: 'exit_screen'
  /**
   * A unique key for this exit screen within the form. The keys are used in exits to
   * indicate which screen is used for the exit. An exit screen with key 'default'
   * must exist in every form.
   */
  key: string
  /**
   * A description of this exit screen. If the responder reaches this exit screen,
   * the screen's description is displayed within the completed form response.
   */
  description: string
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
}

export interface FormResponseListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<FormResponse>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface FormResponseListParams {
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
  sort?: FormResponseListParamsSort
  /**
   * Filter results by form. If multiple form ids are provided, responses matching
   * any of the provided forms will be returned.
   */
  form?: Array<string>
  /**
   * Filter results by member. If multiple member ids are provided, responses
   * matching any of the provided members will be returned.
   */
  member?: Array<string>
  /**
   * Filter results by author.
   */
  author?: Array<string>
  /**
   * Filter results by status.
   */
  status?: Array<FormResponseListParamsStatus>
  /**
   * A time based range filter on the list based on the object created_at field. For
   * example
   * `?created_at[gt]=2021-05-10T16:51:38.075Z&created_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  created_at?: FormResponseListParamsCreatedAt
  /**
   * A time based range filter on the list based on the object completed_at field.
   * For example
   * `?completed_at[gt]=2021-05-10T16:51:38.075Z&completed_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  completed_at?: FormResponseListParamsCompletedAt
}

export type FormResponseListParamsSort =
  | 'created_at'
  | 'completed_at'
  | '-created_at'
  | '-completed_at'
export type FormResponseListParamsStatus = 'not_started' | 'started' | 'completed'

export interface FormResponseListParamsCreatedAt {
  /**
   * Return results where the created_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the created_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the created_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the created_at field is greater than or equal to this
   * value.
   */
  gte?: string
}

export interface FormResponseListParamsCompletedAt {
  /**
   * Return results where the completed_at field is less than this value.
   */
  lt?: string
  /**
   * Return results where the completed_at field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the completed_at field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the completed_at field is greater than or equal to this
   * value.
   */
  gte?: string
}

export interface FormResponseCreateParams {
  /**
   * The version of the form associated with this form response.  The form version
   * associated with the response cannot be changed after creation. Any updates to
   * this response relate to this same form version.
   */
  form_version: string
  /**
   * Member to which the form response belongs. Members can only view responses that
   * are associated with them or with a member whose data they are authorized to
   * access via a relationship.
   */
  member?: string
  /**
   * The individual responses that capture the author's answers to corresponding
   * items within the form version. Each response is associated with the item key of
   * the corresponding question in the form version.
   */
  responses?: Array<FormResponseCreateParamsResponse>
  /**
   * If true, submits the response after updating any included responses. Updates the
   * form response status to 'completed'.
   */
  submit?: boolean
}

export interface FormResponseCreateParamsResponse {
  key: string
  value?: unknown
  values?: unknown
}

export interface FormResponseUpdateParams {
  /**
   * The individual responses that capture the author's answers to corresponding
   * items within the form version. Each response is associated with the item key of
   * the corresponding question in the form version.
   */
  responses?: Array<FormResponseUpdateParamsResponse>
  /**
   * If true, submits the response after updating any included responses. Updates the
   * form response status to 'completed'.
   */
  submit?: boolean
}

export interface FormResponseUpdateParamsResponse {
  key: string
  value?: unknown
  values?: unknown
}

export class FormResponseResource extends Resource {
  /**
   * Returns a list of form responses within the current account. The responses
   * returned are sorted by creation date, with the most recently added appearing
   * first.
   */
  public list(
    params?: FormResponseListParams,
    options?: SourceRequestOptions,
  ): Promise<FormResponseListResponse> {
    return this.source.request('GET', '/v1/form_responses', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new form response for the current active version of the form you
   * specify. Optionally, you can associate the form with a member.
   */
  public create(
    params: FormResponseCreateParams,
    options?: SourceRequestOptions,
  ): Promise<FormResponse> {
    return this.source.request('POST', '/v1/form_responses', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing form response. You need only supply the
   * unique form identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<FormResponse> {
    return this.source.request('GET', `/v1/form_responses/${id}`, {
      options,
    })
  }

  /**
   * Updates a form response.
   *
   * Responses included in the update request are updated and/or appended to the
   * existing response based on each response's associated item key. You can submit a
   * form response when the response is complete using the 'submit' parameter.
   */
  public update(
    id: string,
    params?: FormResponseUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<FormResponse> {
    return this.source.request('POST', `/v1/form_responses/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
