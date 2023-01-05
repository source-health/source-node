import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { CompoundConditional } from '../CompoundConditional'
import { Expandable } from '../shared'

import { Form } from './Form'

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
   * questions, display elements, and groups of items.
   */
  items: Array<FormVersionItem>
  /**
   * A map of 'key' to exit screen content. Each form must contain an exit screen
   * with the key 'default', and additional exit screens can be configured and
   * referenced by exits within the form.
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

export interface FormVersionItem {
  type: 'page'
  /**
   * Array of form elements. Pages can include any element, except another page.
   */
  items: Array<FormVersionItemItem>
  /**
   * Array of exit points.
   */
  exits?: Array<FormVersionItemExit> | null
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem0 {
  type: 'group'
  /**
   * Array of form items, such as questions and display elements.
   */
  items: Array<FormVersionItemItem0Item>
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem0Item0 {
  type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem0Item1 {
  type: 'name'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's name.
   */
  destination?: 'member.name'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionItemItem0Item1Fields
}

export interface FormVersionItemItem0Item1Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  preferred: FormVersionItemItem0Item1FieldsPreferred
}

export type FormVersionItemItem0Item1FieldsPreferred = 'none' | 'optional' | 'required'

export interface FormVersionItemItem0Item2 {
  type: 'date'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's date of birth.
   */
  destination?: 'member.date_of_birth'
  /**
   * Which type of UI element to use - a calendar-style date picker or direct
   * keyboard entry input box.
   */
  input_type: FormVersionItemItem0Item2InputType
}

export type FormVersionItemItem0Item2InputType = 'date_picker' | 'date_entry'

export interface FormVersionItemItem0Item3 {
  type: 'address'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's address.
   */
  destination?: 'member.address'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionItemItem0Item3Fields
}

export interface FormVersionItemItem0Item3Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_1: FormVersionItemItem0Item3FieldsStreetLine1
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_2: FormVersionItemItem0Item3FieldsStreetLine2
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  city: FormVersionItemItem0Item3FieldsCity
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  postal_code: FormVersionItemItem0Item3FieldsPostalCode
}

export type FormVersionItemItem0Item3FieldsStreetLine1 = 'none' | 'optional' | 'required'
export type FormVersionItemItem0Item3FieldsStreetLine2 = 'none' | 'optional' | 'required'
export type FormVersionItemItem0Item3FieldsCity = 'none' | 'optional' | 'required'
export type FormVersionItemItem0Item3FieldsPostalCode = 'none' | 'optional' | 'required'

export interface FormVersionItemItem0Item4 {
  type: 'gender_identity'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's gender identity. See also: sex at birth, pronouns.
   */
  destination?: 'member.gender_identity'
}

export interface FormVersionItemItem0Item5 {
  type: 'sex_at_birth'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's sex at birth.
   */
  destination?: 'member.sex_at_birth'
}

export interface FormVersionItemItem0Item6 {
  type: 'pronouns'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's pronouns.
   */
  destination?: 'member.pronouns'
}

export interface FormVersionItemItem0Item7 {
  type: 'phone_numbers'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's phone numbers.
   */
  destination?: 'member.phone_numbers'
  /**
   * Control which 'use' values are allowed (e.g. 'mobile', or 'fax').
   */
  allowed_uses: Array<FormVersionItemItem0Item7AllowedUs>
  /**
   * The maximum number of phone numbers that can be collected.
   */
  max: number
}

export type FormVersionItemItem0Item7AllowedUs = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface FormVersionItemItem0Item8 {
  type: 'free_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem0Item9 {
  type: 'long_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem0Item10 {
  type: 'number'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Control the minimum allowed value
   */
  min?: number | null
  /**
   * Control the maximum allowed value
   */
  max?: number | null
}

export interface FormVersionItemItem0Item11 {
  type: 'single_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionItemItem0Item11Option>
  /**
   * Controls whether a user-generated 'other' free text field is offered, and
   * whether a free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionItemItem0Item11Other | null
  /**
   * Control the input type of the single-select question.
   */
  input_type: FormVersionItemItem0Item11InputType
}

export interface FormVersionItemItem0Item11Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionItemItem0Item11Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export type FormVersionItemItem0Item11InputType = 'radio' | 'drop_down'

export interface FormVersionItemItem0Item12 {
  type: 'multi_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionItemItem0Item12Option>
  /**
   * Controls whether user-generated 'other' free text fields is offered, and whether
   * at least one free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionItemItem0Item12Other | null
  /**
   * Control the input type of the multi-select question.
   */
  input_type: 'checkbox'
}

export interface FormVersionItemItem0Item12Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionItemItem0Item12Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export interface FormVersionItemItem0Item13 {
  type: 'yes_no'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Display labels for the yes or no options.
   */
  labels?: FormVersionItemItem0Item13Labels | null
}

export interface FormVersionItemItem0Item13Labels {
  /**
   * Display label for the 'yes' option.
   */
  yes?: string | null
  /**
   * Display label for the 'no' option.
   */
  no?: string | null
}

export type FormVersionItemItem0Item =
  | FormVersionItemItem0Item0
  | FormVersionItemItem0Item1
  | FormVersionItemItem0Item2
  | FormVersionItemItem0Item3
  | FormVersionItemItem0Item4
  | FormVersionItemItem0Item5
  | FormVersionItemItem0Item6
  | FormVersionItemItem0Item7
  | FormVersionItemItem0Item8
  | FormVersionItemItem0Item9
  | FormVersionItemItem0Item10
  | FormVersionItemItem0Item11
  | FormVersionItemItem0Item12
  | FormVersionItemItem0Item13

export interface FormVersionItemItem1 {
  type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem2 {
  type: 'name'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's name.
   */
  destination?: 'member.name'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionItemItem2Fields
}

export interface FormVersionItemItem2Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  preferred: FormVersionItemItem2FieldsPreferred
}

export type FormVersionItemItem2FieldsPreferred = 'none' | 'optional' | 'required'

export interface FormVersionItemItem3 {
  type: 'date'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's date of birth.
   */
  destination?: 'member.date_of_birth'
  /**
   * Which type of UI element to use - a calendar-style date picker or direct
   * keyboard entry input box.
   */
  input_type: FormVersionItemItem3InputType
}

export type FormVersionItemItem3InputType = 'date_picker' | 'date_entry'

export interface FormVersionItemItem4 {
  type: 'address'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's address.
   */
  destination?: 'member.address'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionItemItem4Fields
}

export interface FormVersionItemItem4Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_1: FormVersionItemItem4FieldsStreetLine1
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_2: FormVersionItemItem4FieldsStreetLine2
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  city: FormVersionItemItem4FieldsCity
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  postal_code: FormVersionItemItem4FieldsPostalCode
}

export type FormVersionItemItem4FieldsStreetLine1 = 'none' | 'optional' | 'required'
export type FormVersionItemItem4FieldsStreetLine2 = 'none' | 'optional' | 'required'
export type FormVersionItemItem4FieldsCity = 'none' | 'optional' | 'required'
export type FormVersionItemItem4FieldsPostalCode = 'none' | 'optional' | 'required'

export interface FormVersionItemItem5 {
  type: 'gender_identity'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's gender identity. See also: sex at birth, pronouns.
   */
  destination?: 'member.gender_identity'
}

export interface FormVersionItemItem6 {
  type: 'sex_at_birth'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's sex at birth.
   */
  destination?: 'member.sex_at_birth'
}

export interface FormVersionItemItem7 {
  type: 'pronouns'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's pronouns.
   */
  destination?: 'member.pronouns'
}

export interface FormVersionItemItem8 {
  type: 'phone_numbers'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's phone numbers.
   */
  destination?: 'member.phone_numbers'
  /**
   * Control which 'use' values are allowed (e.g. 'mobile', or 'fax').
   */
  allowed_uses: Array<FormVersionItemItem8AllowedUs>
  /**
   * The maximum number of phone numbers that can be collected.
   */
  max: number
}

export type FormVersionItemItem8AllowedUs = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface FormVersionItemItem9 {
  type: 'free_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem10 {
  type: 'long_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionItemItem11 {
  type: 'number'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Control the minimum allowed value
   */
  min?: number | null
  /**
   * Control the maximum allowed value
   */
  max?: number | null
}

export interface FormVersionItemItem12 {
  type: 'single_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionItemItem12Option>
  /**
   * Controls whether a user-generated 'other' free text field is offered, and
   * whether a free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionItemItem12Other | null
  /**
   * Control the input type of the single-select question.
   */
  input_type: FormVersionItemItem12InputType
}

export interface FormVersionItemItem12Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionItemItem12Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export type FormVersionItemItem12InputType = 'radio' | 'drop_down'

export interface FormVersionItemItem13 {
  type: 'multi_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionItemItem13Option>
  /**
   * Controls whether user-generated 'other' free text fields is offered, and whether
   * at least one free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionItemItem13Other | null
  /**
   * Control the input type of the multi-select question.
   */
  input_type: 'checkbox'
}

export interface FormVersionItemItem13Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionItemItem13Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export interface FormVersionItemItem14 {
  type: 'yes_no'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Display labels for the yes or no options.
   */
  labels?: FormVersionItemItem14Labels | null
}

export interface FormVersionItemItem14Labels {
  /**
   * Display label for the 'yes' option.
   */
  yes?: string | null
  /**
   * Display label for the 'no' option.
   */
  no?: string | null
}

export type FormVersionItemItem =
  | FormVersionItemItem0
  | FormVersionItemItem1
  | FormVersionItemItem2
  | FormVersionItemItem3
  | FormVersionItemItem4
  | FormVersionItemItem5
  | FormVersionItemItem6
  | FormVersionItemItem7
  | FormVersionItemItem8
  | FormVersionItemItem9
  | FormVersionItemItem10
  | FormVersionItemItem11
  | FormVersionItemItem12
  | FormVersionItemItem13
  | FormVersionItemItem14

export interface FormVersionItemExit {
  type: 'exit'
  /**
   * Indicates which exit screen to display if the conditions are met.
   */
  exit_screen_key: string
  /**
   * A 'compound' conditional (in contrast to a 'concrete' one) takes a set of other
   * conditionals and applies the give '$or' or '$and' condition to combine them.
   *
   * The operands may be concrete conditionals or compound ones, allowing nested
   * 'and'/'or' combinations.
   */
  conditional: CompoundConditional
}

export interface FormVersionExitScreen {
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
   * questions, display elements, and groups of items.
   */
  items: Array<FormVersionLatestParamsItem>
  /**
   * A map of exit keys to exit screen content. Each form version must contain an
   * exit screen with the key 'default', and additional exit screens can be
   * configured and referenced by exits within the form version.
   */
  exit_screens: Array<FormVersionLatestParamsExitScreen>
}

export interface FormVersionLatestParamsItem {
  type: 'page'
  /**
   * Array of form elements. Pages can include any element, except another page.
   */
  items: Array<FormVersionLatestParamsItemItem>
  /**
   * Array of exit points.
   */
  exits?: Array<FormVersionLatestParamsItemExit> | null
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem0 {
  type: 'group'
  /**
   * Array of form items, such as questions and display elements.
   */
  items: Array<FormVersionLatestParamsItemItem0Item>
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem0Item0 {
  type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem0Item1 {
  type: 'name'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's name.
   */
  destination?: 'member.name'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionLatestParamsItemItem0Item1Fields
}

export interface FormVersionLatestParamsItemItem0Item1Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  preferred: FormVersionLatestParamsItemItem0Item1FieldsPreferred
}

export type FormVersionLatestParamsItemItem0Item1FieldsPreferred = 'none' | 'optional' | 'required'

export interface FormVersionLatestParamsItemItem0Item2 {
  type: 'date'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's date of birth.
   */
  destination?: 'member.date_of_birth'
  /**
   * Which type of UI element to use - a calendar-style date picker or direct
   * keyboard entry input box.
   */
  input_type: FormVersionLatestParamsItemItem0Item2InputType
}

export type FormVersionLatestParamsItemItem0Item2InputType = 'date_picker' | 'date_entry'

export interface FormVersionLatestParamsItemItem0Item3 {
  type: 'address'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's address.
   */
  destination?: 'member.address'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionLatestParamsItemItem0Item3Fields
}

export interface FormVersionLatestParamsItemItem0Item3Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_1: FormVersionLatestParamsItemItem0Item3FieldsStreetLine1
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_2: FormVersionLatestParamsItemItem0Item3FieldsStreetLine2
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  city: FormVersionLatestParamsItemItem0Item3FieldsCity
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  postal_code: FormVersionLatestParamsItemItem0Item3FieldsPostalCode
}

export type FormVersionLatestParamsItemItem0Item3FieldsStreetLine1 =
  | 'none'
  | 'optional'
  | 'required'
export type FormVersionLatestParamsItemItem0Item3FieldsStreetLine2 =
  | 'none'
  | 'optional'
  | 'required'
export type FormVersionLatestParamsItemItem0Item3FieldsCity = 'none' | 'optional' | 'required'
export type FormVersionLatestParamsItemItem0Item3FieldsPostalCode = 'none' | 'optional' | 'required'

export interface FormVersionLatestParamsItemItem0Item4 {
  type: 'gender_identity'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's gender identity. See also: sex at birth, pronouns.
   */
  destination?: 'member.gender_identity'
}

export interface FormVersionLatestParamsItemItem0Item5 {
  type: 'sex_at_birth'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's sex at birth.
   */
  destination?: 'member.sex_at_birth'
}

export interface FormVersionLatestParamsItemItem0Item6 {
  type: 'pronouns'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's pronouns.
   */
  destination?: 'member.pronouns'
}

export interface FormVersionLatestParamsItemItem0Item7 {
  type: 'phone_numbers'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's phone numbers.
   */
  destination?: 'member.phone_numbers'
  /**
   * Control which 'use' values are allowed (e.g. 'mobile', or 'fax').
   */
  allowed_uses: Array<FormVersionLatestParamsItemItem0Item7AllowedUs>
  /**
   * The maximum number of phone numbers that can be collected.
   */
  max: number
}

export type FormVersionLatestParamsItemItem0Item7AllowedUs =
  | 'home'
  | 'work'
  | 'mobile'
  | 'fax'
  | 'other'

export interface FormVersionLatestParamsItemItem0Item8 {
  type: 'free_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem0Item9 {
  type: 'long_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem0Item10 {
  type: 'number'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Control the minimum allowed value
   */
  min?: number | null
  /**
   * Control the maximum allowed value
   */
  max?: number | null
}

export interface FormVersionLatestParamsItemItem0Item11 {
  type: 'single_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionLatestParamsItemItem0Item11Option>
  /**
   * Controls whether a user-generated 'other' free text field is offered, and
   * whether a free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionLatestParamsItemItem0Item11Other | null
  /**
   * Control the input type of the single-select question.
   */
  input_type: FormVersionLatestParamsItemItem0Item11InputType
}

export interface FormVersionLatestParamsItemItem0Item11Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionLatestParamsItemItem0Item11Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export type FormVersionLatestParamsItemItem0Item11InputType = 'radio' | 'drop_down'

export interface FormVersionLatestParamsItemItem0Item12 {
  type: 'multi_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionLatestParamsItemItem0Item12Option>
  /**
   * Controls whether user-generated 'other' free text fields is offered, and whether
   * at least one free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionLatestParamsItemItem0Item12Other | null
  /**
   * Control the input type of the multi-select question.
   */
  input_type: 'checkbox'
}

export interface FormVersionLatestParamsItemItem0Item12Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionLatestParamsItemItem0Item12Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export interface FormVersionLatestParamsItemItem0Item13 {
  type: 'yes_no'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Display labels for the yes or no options.
   */
  labels?: FormVersionLatestParamsItemItem0Item13Labels | null
}

export interface FormVersionLatestParamsItemItem0Item13Labels {
  /**
   * Display label for the 'yes' option.
   */
  yes?: string | null
  /**
   * Display label for the 'no' option.
   */
  no?: string | null
}

export type FormVersionLatestParamsItemItem0Item =
  | FormVersionLatestParamsItemItem0Item0
  | FormVersionLatestParamsItemItem0Item1
  | FormVersionLatestParamsItemItem0Item2
  | FormVersionLatestParamsItemItem0Item3
  | FormVersionLatestParamsItemItem0Item4
  | FormVersionLatestParamsItemItem0Item5
  | FormVersionLatestParamsItemItem0Item6
  | FormVersionLatestParamsItemItem0Item7
  | FormVersionLatestParamsItemItem0Item8
  | FormVersionLatestParamsItemItem0Item9
  | FormVersionLatestParamsItemItem0Item10
  | FormVersionLatestParamsItemItem0Item11
  | FormVersionLatestParamsItemItem0Item12
  | FormVersionLatestParamsItemItem0Item13

export interface FormVersionLatestParamsItemItem1 {
  type: 'rich_text'
  /**
   * Type of the rich text content. Currently only `md` (i.e. Markdown) is supported.
   */
  content_type: 'md'
  /**
   * The rich text content, represented as Markdown text.
   */
  content: string
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem2 {
  type: 'name'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's name.
   */
  destination?: 'member.name'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionLatestParamsItemItem2Fields
}

export interface FormVersionLatestParamsItemItem2Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  preferred: FormVersionLatestParamsItemItem2FieldsPreferred
}

export type FormVersionLatestParamsItemItem2FieldsPreferred = 'none' | 'optional' | 'required'

export interface FormVersionLatestParamsItemItem3 {
  type: 'date'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's date of birth.
   */
  destination?: 'member.date_of_birth'
  /**
   * Which type of UI element to use - a calendar-style date picker or direct
   * keyboard entry input box.
   */
  input_type: FormVersionLatestParamsItemItem3InputType
}

export type FormVersionLatestParamsItemItem3InputType = 'date_picker' | 'date_entry'

export interface FormVersionLatestParamsItemItem4 {
  type: 'address'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's address.
   */
  destination?: 'member.address'
  /**
   * Indicates which fields are optional, required, or should not be shown at all.
   */
  fields: FormVersionLatestParamsItemItem4Fields
}

export interface FormVersionLatestParamsItemItem4Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_1: FormVersionLatestParamsItemItem4FieldsStreetLine1
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_2: FormVersionLatestParamsItemItem4FieldsStreetLine2
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  city: FormVersionLatestParamsItemItem4FieldsCity
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  postal_code: FormVersionLatestParamsItemItem4FieldsPostalCode
}

export type FormVersionLatestParamsItemItem4FieldsStreetLine1 = 'none' | 'optional' | 'required'
export type FormVersionLatestParamsItemItem4FieldsStreetLine2 = 'none' | 'optional' | 'required'
export type FormVersionLatestParamsItemItem4FieldsCity = 'none' | 'optional' | 'required'
export type FormVersionLatestParamsItemItem4FieldsPostalCode = 'none' | 'optional' | 'required'

export interface FormVersionLatestParamsItemItem5 {
  type: 'gender_identity'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's gender identity. See also: sex at birth, pronouns.
   */
  destination?: 'member.gender_identity'
}

export interface FormVersionLatestParamsItemItem6 {
  type: 'sex_at_birth'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's sex at birth.
   */
  destination?: 'member.sex_at_birth'
}

export interface FormVersionLatestParamsItemItem7 {
  type: 'pronouns'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's pronouns.
   */
  destination?: 'member.pronouns'
}

export interface FormVersionLatestParamsItemItem8 {
  type: 'phone_numbers'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Indicates that the response from this question should be used to populate or
   * update the member's phone numbers.
   */
  destination?: 'member.phone_numbers'
  /**
   * Control which 'use' values are allowed (e.g. 'mobile', or 'fax').
   */
  allowed_uses: Array<FormVersionLatestParamsItemItem8AllowedUs>
  /**
   * The maximum number of phone numbers that can be collected.
   */
  max: number
}

export type FormVersionLatestParamsItemItem8AllowedUs = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface FormVersionLatestParamsItemItem9 {
  type: 'free_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem10 {
  type: 'long_text'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
}

export interface FormVersionLatestParamsItemItem11 {
  type: 'number'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Control the minimum allowed value
   */
  min?: number | null
  /**
   * Control the maximum allowed value
   */
  max?: number | null
}

export interface FormVersionLatestParamsItemItem12 {
  type: 'single_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionLatestParamsItemItem12Option>
  /**
   * Controls whether a user-generated 'other' free text field is offered, and
   * whether a free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionLatestParamsItemItem12Other | null
  /**
   * Control the input type of the single-select question.
   */
  input_type: FormVersionLatestParamsItemItem12InputType
}

export interface FormVersionLatestParamsItemItem12Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionLatestParamsItemItem12Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export type FormVersionLatestParamsItemItem12InputType = 'radio' | 'drop_down'

export interface FormVersionLatestParamsItemItem13 {
  type: 'multi_select'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * The list of options available for this question.
   */
  options: Array<FormVersionLatestParamsItemItem13Option>
  /**
   * Controls whether user-generated 'other' free text fields is offered, and whether
   * at least one free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: FormVersionLatestParamsItemItem13Other | null
  /**
   * Control the input type of the multi-select question.
   */
  input_type: 'checkbox'
}

export interface FormVersionLatestParamsItemItem13Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface FormVersionLatestParamsItemItem13Other {
  /**
   * Display label for the 'other' option.
   */
  label: string
  /**
   * Whether or not a response to the free-text input is required if the responder
   * selected 'other'
   */
  required: boolean
}

export interface FormVersionLatestParamsItemItem14 {
  type: 'yes_no'
  /**
   * Display title of this question in the form, i.e. the question text itself.
   */
  title: string
  /**
   * An optional secondary text for this question, which will be displayed under the
   * title and can contain, for example, instructions on how to answer the question.
   */
  description?: string
  /**
   * Whether a response to this question is required or optional. Questions that are
   * hidden by conditional rules are never required to have a response.
   */
  required: boolean
  /**
   * Unique key of this item within the form. Used in responses and conditional
   * logic.
   */
  key: string
  /**
   * A conditional statement - if it evaluates to true, this question will be
   * displayed, if false the question will not be displayed and no response will be
   * recorded for it.
   */
  conditional?: CompoundConditional
  /**
   * Display labels for the yes or no options.
   */
  labels?: FormVersionLatestParamsItemItem14Labels | null
}

export interface FormVersionLatestParamsItemItem14Labels {
  /**
   * Display label for the 'yes' option.
   */
  yes?: string | null
  /**
   * Display label for the 'no' option.
   */
  no?: string | null
}

export type FormVersionLatestParamsItemItem =
  | FormVersionLatestParamsItemItem0
  | FormVersionLatestParamsItemItem1
  | FormVersionLatestParamsItemItem2
  | FormVersionLatestParamsItemItem3
  | FormVersionLatestParamsItemItem4
  | FormVersionLatestParamsItemItem5
  | FormVersionLatestParamsItemItem6
  | FormVersionLatestParamsItemItem7
  | FormVersionLatestParamsItemItem8
  | FormVersionLatestParamsItemItem9
  | FormVersionLatestParamsItemItem10
  | FormVersionLatestParamsItemItem11
  | FormVersionLatestParamsItemItem12
  | FormVersionLatestParamsItemItem13
  | FormVersionLatestParamsItemItem14

export interface FormVersionLatestParamsItemExit {
  type: 'exit'
  /**
   * Indicates which exit screen to display if the conditions are met.
   */
  exit_screen_key: string
  /**
   * A 'compound' conditional (in contrast to a 'concrete' one) takes a set of other
   * conditionals and applies the give '$or' or '$and' condition to combine them.
   *
   * The operands may be concrete conditionals or compound ones, allowing nested
   * 'and'/'or' combinations.
   */
  conditional: CompoundConditional
}

export interface FormVersionLatestParamsExitScreen {
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
