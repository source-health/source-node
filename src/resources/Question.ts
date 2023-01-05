import { CompoundConditional } from './CompoundConditional'

export interface Question0 {
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
  fields: Question0Fields
}

export interface Question0Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  preferred: Question0FieldsPreferred
}

export type Question0FieldsPreferred = 'none' | 'optional' | 'required'

export interface Question1 {
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
  input_type: Question1InputType
}

export type Question1InputType = 'date_picker' | 'date_entry'

export interface Question2 {
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
  fields: Question2Fields
}

export interface Question2Fields {
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_1: Question2FieldsStreetLine1
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  street_line_2: Question2FieldsStreetLine2
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  city: Question2FieldsCity
  /**
   * Indicates whether the given sub-field should be displayed or not, and if so,
   * whether a response is optional or required.
   */
  postal_code: Question2FieldsPostalCode
}

export type Question2FieldsStreetLine1 = 'none' | 'optional' | 'required'
export type Question2FieldsStreetLine2 = 'none' | 'optional' | 'required'
export type Question2FieldsCity = 'none' | 'optional' | 'required'
export type Question2FieldsPostalCode = 'none' | 'optional' | 'required'

export interface Question3 {
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

export interface Question4 {
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

export interface Question5 {
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

export interface Question6 {
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
  allowed_uses: Array<Question6AllowedUs>
  /**
   * The maximum number of phone numbers that can be collected.
   */
  max: number
}

export type Question6AllowedUs = 'home' | 'work' | 'mobile' | 'fax' | 'other'

export interface Question7 {
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

export interface Question8 {
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

export interface Question9 {
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

export interface Question10 {
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
  options: Array<Question10Option>
  /**
   * Controls whether a user-generated 'other' free text field is offered, and
   * whether a free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: Question10Other | null
  /**
   * Control the input type of the single-select question.
   */
  input_type: Question10InputType
}

export interface Question10Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface Question10Other {
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

export type Question10InputType = 'radio' | 'drop_down'

export interface Question11 {
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
  options: Array<Question11Option>
  /**
   * Controls whether user-generated 'other' free text fields is offered, and whether
   * at least one free text response is required. If this object is blank or null, no
   * 'other' option is presented.
   */
  other?: Question11Other | null
  /**
   * Control the input type of the multi-select question.
   */
  input_type: 'checkbox'
}

export interface Question11Option {
  /**
   * Hidden 'key' for this option. Must be unique within the question.
   */
  key: string
  /**
   * Display label for this option. Must be unique within the question.
   */
  label: string
}

export interface Question11Other {
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

export interface Question12 {
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
  labels?: Question12Labels | null
}

export interface Question12Labels {
  /**
   * Display label for the 'yes' option.
   */
  yes?: string | null
  /**
   * Display label for the 'no' option.
   */
  no?: string | null
}

export type Question =
  | Question0
  | Question1
  | Question2
  | Question3
  | Question4
  | Question5
  | Question6
  | Question7
  | Question8
  | Question9
  | Question10
  | Question11
  | Question12
