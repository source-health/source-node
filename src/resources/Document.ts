import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { File } from './File'
import { Member } from './Member'
import { Expandable } from './shared'

export interface Document {
  /**
   * Always `document`.
   */
  object: 'document'
  /**
   * Unique ID for the document.
   */
  id: string
  /**
   * A short-form name of the document.
   */
  name: string
  /**
   * A long-form text description of the document.
   */
  description: string | null
  /**
   * The member associated with the document.
   */
  member: Expandable<Member>
  /**
   * The file that represents the document.
   */
  file: Expandable<File>
  /**
   * Whether only internal users or a member can view this document. If not
   * specified, the default is false and a member can view the document.
   */
  internal: boolean
  /**
   * When the document was originally created or authored. When creating a document,
   * if no date is provided, the date the document is created is used.
   */
  date: string
  /**
   * Timestamp when the document was created.
   */
  created_at: string
  /**
   * Timestamp when the document was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the document was deleted.
   */
  deleted_at: string | null
}

export interface DocumentListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Document>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface DocumentListParams {
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
  sort?: DocumentListParamsSort
  /**
   * Filter results by member. If multiple member ids are provided, documents
   * matching any of the provided members will be returned.
   */
  member?: Array<string>
  /**
   * Filter results by document name.
   */
  name?: string
  /**
   * Filter results by whether or not the document is internal-only or can be viewed
   * by the member.
   */
  internal?: boolean
  /**
   * A time based range filter on the list based on the object date field. For
   * example `?date[gt]=2021-05-10T16:51:38.075Z&date[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  date?: DocumentListParamsDate
  /**
   * A time based range filter on the list based on the object created_at field. For
   * example
   * `?created_at[gt]=2021-05-10T16:51:38.075Z&created_at[lte]=2021-05-26T16:51:38.075Z`.
   * The value is a dictionary with the following:
   */
  created_at?: DocumentListParamsCreatedAt
}

export type DocumentListParamsSort =
  | 'created_at'
  | 'name'
  | 'date'
  | '-created_at'
  | '-name'
  | '-date'

export interface DocumentListParamsDate {
  /**
   * Return results where the date field is less than this value.
   */
  lt?: string
  /**
   * Return results where the date field is less than or equal to this value.
   */
  lte?: string
  /**
   * Return results where the date field is greater than this value.
   */
  gt?: string
  /**
   * Return results where the date field is greater than or equal to this value.
   */
  gte?: string
}

export interface DocumentListParamsCreatedAt {
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

export interface DocumentCreateParams {
  /**
   * The member associated with the document.
   */
  member: string
  /**
   * The file that represents the document.
   */
  file: string
  /**
   * When the document was originally created or authored. When creating a document,
   * if no date is provided, the date the document is created is used.
   */
  date?: string
  /**
   * Whether only internal users or a member can view this document. If not
   * specified, the default is false and a member can view the document.
   */
  internal?: boolean
  /**
   * A short-form name of the document.
   */
  name: string
  /**
   * A long-form text description of the document.
   */
  description?: string | null
}

export interface DocumentUpdateParams {
  /**
   * When the document was originally created or authored. When creating a document,
   * if no date is provided, the date the document is created is used.
   */
  date?: string
  /**
   * Whether only internal users or a member can view this document. If not
   * specified, the default is false and a member can view the document.
   */
  internal?: boolean
  /**
   * A short-form name of the document.
   */
  name?: string
  /**
   * A long-form text description of the document.
   */
  description?: string | null
}

export class DocumentResource extends Resource {
  /**
   * Returns a list of documents within the current account.
   *
   * The documents returned are sorted by creation date, with the most recently added
   * document appearing first.
   */
  public list(
    params?: DocumentListParams,
    options?: SourceRequestOptions,
  ): Promise<DocumentListResponse> {
    return this.source.request('GET', '/v1/documents', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new document for the member you specify. Use the [Files API](../file/)
   * to upload a file with a purpose of document to include in the document resource.
   */
  public create(params: DocumentCreateParams, options?: SourceRequestOptions): Promise<Document> {
    return this.source.request('POST', '/v1/documents', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing document. You need only supply the unique
   * document identifier that was returned upon creation or when listing documents.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Document> {
    return this.source.request('GET', `/v1/documents/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified document by setting the values of the parameters passed.
   * Any parameters not provided will be left unchanged.
   */
  public update(
    id: string,
    params?: DocumentUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Document> {
    return this.source.request('POST', `/v1/documents/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified document. When a document is deleted, the associated file
   * is not guaranteed to remain stored by Source and can no longer be accessed by a
   * member.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Document> {
    return this.source.request('DELETE', `/v1/documents/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
