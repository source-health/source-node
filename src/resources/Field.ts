import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export interface Field {
  /**
   * Always `field`.
   */
  object: 'field'
  /**
   * Unique ID for the field.
   */
  id: string
  /**
   * The key for this field, for use in the API. Keys must be alphanumeric strings
   * and can contain hyphens or underscores.
   *
   * Once a field has been created, its key cannot change. You are able to change its
   * display name.
   */
  key: string
  /**
   * The display name for a custom field. This is the name that will show in visual
   * presentations of this field to members or users.
   */
  name: string
  /**
   * The resource to which the field belongs. Currently, custom fields are only
   * supported on members.
   */
  resource_type: string
  /**
   * The data type of this custom field. The following data types are supported:
   *
   * - string: a single line of text, up to 255 characters
   *
   * - text: a long form text input, with no predefined length
   *
   * - number: a number, or string which can be interpreted as a number
   *
   * - date: a date, without a time component
   *
   * Note that once a field is created, its data type cannot change.
   */
  type: FieldType
  /**
   * User-facing description for this field. This description can be updated as
   * needed. Descriptions are not shared with members.
   */
  description: string | null
  /**
   * Access level that members should be granted to this field. By default, fields
   * are created with member access level 'none', indicating they can not read or
   * write ot the field. You may also use 'read', which will allow members to read
   * field data, but not write. Alternatively, you can use 'write' which grants the
   * member read/write access.
   */
  member_access: FieldMemberAccess
  /**
   * A list of options available for this field. You can create and update an array
   * of options, each with a unique key and a display label, in order to store
   * discrete values within the field.
   */
  options: Array<FieldOption>
  /**
   * Timestamp of when the field was created.
   */
  created_at: string
  /**
   * Timestamp of when the field was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the field was deleted, which is only present for deleted fields.
   * Deleted fields are not typically returned by the API, however they are returned
   * in `field.deleted` events and expanded references on other objects.
   */
  deleted_at?: string
}

export type FieldType = 'string' | 'text' | 'number' | 'date' | 'enum'
export type FieldMemberAccess = 'none' | 'read' | 'write'

export interface FieldOption {
  key: string
  label: string
}

export interface FieldListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Field>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface FieldListParams {
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
}

export interface FieldCreateParams {
  /**
   * The key for this field, for use in the API. Keys must be alphanumeric strings
   * and can contain hyphens or underscores.
   *
   * Once a field has been created, its key cannot change. You are able to change its
   * display name.
   */
  key: string
  /**
   * The display name for a custom field. This is the name that will show in visual
   * presentations of this field to members or users.
   */
  name: string
  /**
   * The data type of this custom field. The following data types are supported:
   *
   * - string: a single line of text, up to 255 characters
   *
   * - text: a long form text input, with no predefined length
   *
   * - number: a number, or string which can be interpreted as a number
   *
   * - date: a date, without a time component
   *
   * Note that once a field is created, its data type cannot change.
   */
  type: FieldCreateParamsType
  /**
   * User-facing description for this field. This description can be updated as
   * needed. Descriptions are not shared with members.
   */
  description?: string | null
  /**
   * Access level that members should be granted to this field. By default, fields
   * are created with member access level 'none', indicating they can not read or
   * write ot the field. You may also use 'read', which will allow members to read
   * field data, but not write. Alternatively, you can use 'write' which grants the
   * member read/write access.
   */
  member_access?: FieldCreateParamsMemberAccess
  /**
   * A list of options available for this field. You can create and update an array
   * of options, each with a unique key and a display label, in order to store
   * discrete values within the field.
   */
  options?: Array<FieldCreateParamsOption>
}

export type FieldCreateParamsType = 'string' | 'text' | 'number' | 'date' | 'enum'
export type FieldCreateParamsMemberAccess = 'none' | 'read' | 'write'

export interface FieldCreateParamsOption {
  key: string
  label: string
}

export interface FieldUpdateParams {
  /**
   * The display name for a custom field. This is the name that will show in visual
   * presentations of this field to members or users.
   */
  name?: string
  /**
   * User-facing description for this field. This description can be updated as
   * needed. Descriptions are not shared with members.
   */
  description?: string | null
  /**
   * Access level that members should be granted to this field. By default, fields
   * are created with member access level 'none', indicating they can not read or
   * write ot the field. You may also use 'read', which will allow members to read
   * field data, but not write. Alternatively, you can use 'write' which grants the
   * member read/write access.
   */
  member_access?: FieldUpdateParamsMemberAccess
  /**
   * A list of options available for this field. You can create and update an array
   * of options, each with a unique key and a display label, in order to store
   * discrete values within the field.
   */
  options?: Array<FieldUpdateParamsOption>
}

export type FieldUpdateParamsMemberAccess = 'none' | 'read' | 'write'

export interface FieldUpdateParamsOption {
  key: string
  label: string
}

export class FieldResource extends Resource {
  /**
   * Lists all fields belonging to the provided object.
   */
  public list(
    object: string,
    params?: FieldListParams,
    options?: SourceRequestOptions,
  ): Promise<FieldListResponse> {
    return this.source.request('GET', `/v1/objects/${object}/fields`, {
      query: params,
      options,
    })
  }

  /**
   * Creates a new field.
   *
   * Currently, Source only allows the creation of custom fields on a member
   * resource. Other resources will support fields in future API updates.
   */
  public create(
    object: string,
    params: FieldCreateParams,
    options?: SourceRequestOptions,
  ): Promise<Field> {
    return this.source.request('POST', `/v1/objects/${object}/fields`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing field on an object.
   */
  public retrieve(object: string, id: string, options?: SourceRequestOptions): Promise<Field> {
    return this.source.request('GET', `/v1/objects/${object}/fields/${id}`, {
      options,
    })
  }

  /**
   * Updates an existing field, referenced by its unique identifier.
   *
   * Once a field is created, its neither its key nor data type can be modified. If
   * you need to change data types, you may create another field, migrate the data
   * using the API, and delete the first field.
   */
  public update(
    object: string,
    id: string,
    params?: FieldUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Field> {
    return this.source.request('POST', `/v1/objects/${object}/fields/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes an existing field, referenced by its unique identifier.
   *
   * **Important**: Deleting a field is a destructive action. When deleting a field,
   * Source schedules a cleanup action that will remove any value provided to that
   * field, for any resource referencing the field. This action is irreversible.
   *
   * Please ensure you no longer need the data in a field before deleting it.
   */
  public delete(object: string, id: string, options?: SourceRequestOptions): Promise<Field> {
    return this.source.request('DELETE', `/v1/objects/${object}/fields/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
