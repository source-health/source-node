import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

export interface Tag {
  /**
   * Always `tag`.
   */
  object: 'tag'
  /**
   * Unique ID for the tag.
   */
  id: string
  /**
   * Unique name of the tag that is used for display.
   */
  name: string
  /**
   * Description for this tag. The description is not displayed and is used to
   * capture administrative notes about the tag.
   */
  description: string | null
  /**
   * The color of the tag when displaying the tag. This is primarily used in the
   * Source UI, but you're able to use this in your own system as well.
   */
  color: TagColor | null
  /**
   * Timestamp of when the tag was created.
   */
  created_at: string
  /**
   * Timestamp of when the tag was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the tag was archived. If the tag is not archived, this field is
   * null.
   */
  archived_at: string | null
  /**
   * Timestamp when the tag was deleted, which is only present for deleted tags.
   * Deleted tags are not typically returned by the API, however they are returned in
   * `tag.deleted` events and expanded references on other objects.
   */
  deleted_at?: string
}

export type TagColor = 'gray' | 'blue' | 'teal' | 'yellow' | 'green' | 'red' | 'orange' | 'purple'

export interface TagListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Tag>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface TagListParams {
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
  sort?: TagListParamsSort
  /**
   * Filter results by tags matching the provided name. This parameter is case
   * insensitive.
   */
  name?: string
  /**
   * Filter tags to only those whose archive status matches the provided value. By
   * default, this operation return all tags. You may pass `archived=true` to show
   * archived tags, or `archived=false` to show unarchived tags.
   */
  archived?: boolean
}

export type TagListParamsSort = 'created_at' | 'name' | '-created_at' | '-name'

export interface TagCreateParams {
  /**
   * Unique name of the tag that is used for display. Must not start with tag_
   */
  name: string
  /**
   * Description for this tag. The description is not displayed and is used to
   * capture administrative notes about the tag.
   */
  description?: string | null
  /**
   * The color of the tag when displaying the tag. This is primarily used in the
   * Source UI, but you're able to use this in your own system as well.
   */
  color?: TagCreateParamsColor
}

export type TagCreateParamsColor =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'

export interface TagUpdateParams {
  /**
   * Unique name of the tag that is used for display. Must not start with tag_
   */
  name?: string
  /**
   * Description for this tag. The description is not displayed and is used to
   * capture administrative notes about the tag.
   */
  description?: string | null
  /**
   * The color of the tag when displaying the tag. This is primarily used in the
   * Source UI, but you're able to use this in your own system as well.
   */
  color?: TagUpdateParamsColor
}

export type TagUpdateParamsColor =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'

export class TagResource extends Resource {
  /**
   * Returns a list of tags within the current account. The tags returned are sorted
   * by creation date, with the most recently added tag appearing first.
   */
  public list(params?: TagListParams, options?: SourceRequestOptions): Promise<TagListResponse> {
    return this.source.request('GET', '/v1/tags', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new tag. You can create a new tag with a unique name and a display
   * color of your choice. If a tag already exists with the same name (case
   * insensitive), an error is returned.
   */
  public create(params: TagCreateParams, options?: SourceRequestOptions): Promise<Tag> {
    return this.source.request('POST', '/v1/tags', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieve a tag by its unique identifier.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Tag> {
    return this.source.request('GET', `/v1/tags/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified tag by setting the values of the parameters passed. Any
   * parameters not provided will be left unchanged.
   */
  public update(
    id: string,
    params?: TagUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Tag> {
    return this.source.request('POST', `/v1/tags/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified tag. A deleted tag is removed from all members to which it
   * relates.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Tag> {
    return this.source.request('DELETE', `/v1/tags/${id}`, {
      contentType: 'json',
      options,
    })
  }

  /**
   * Archives the specified tag. An archived tag can be viewed on any member it
   * relates to but cannot be added to additional members.
   */
  public archive(id: string, options?: SourceRequestOptions): Promise<Tag> {
    return this.source.request('POST', `/v1/tags/${id}/archive`, {
      contentType: 'json',
      options,
    })
  }

  /**
   * Unarchives the specified tag. Once unarchived, the tag can be reapplied to
   * additional members.
   */
  public unarchive(id: string, options?: SourceRequestOptions): Promise<Tag> {
    return this.source.request('POST', `/v1/tags/${id}/unarchive`, {
      contentType: 'json',
      options,
    })
  }
}
