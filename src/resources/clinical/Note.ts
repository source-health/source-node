import { Resource } from '../../BaseResource'
import { SourceRequestOptions } from '../../SourceClient'
import { Member } from '../Member'
import { NoteContentNode } from '../NoteContentNode'
import { User } from '../User'
import { Expandable } from '../shared'

import { Encounter } from './Encounter'
import { NoteVersion } from './NoteVersion'

export interface Note {
  /**
   * Always `note`.
   */
  object: 'note'
  /**
   * Unique ID for the note.
   */
  id: string
  /**
   * Encounter to which this note belongs.
   */
  encounter: Expandable<Encounter>
  /**
   * Member to which this note belongs.
   */
  member: Expandable<Member>
  /**
   * Author of this note. The author must always be a user and cannot be modified
   * once the note is created. If a new author is required for a note, the original
   * note must be superseded.
   */
  author: Expandable<User>
  /**
   * Latest version of the note. The latest version is automatically updated as the
   * note is drafted and signed.
   */
  latest_version: NoteVersion
  /**
   * Finalized, signed version of the note. Once signed, a note cannot be modified,
   * except by superseding the note. A subsequent version may only be created by the
   * system, for example in order to populate references to other resources within
   * the structure of the note.
   */
  signed_version: Expandable<Note> | null
  /**
   * Timestamp when the note was signed.
   */
  signed_at: string | null
  /**
   * Identifier of the note that supersedes this note. You can supersede a signed
   * note in order to addend or  correct the original note.
   */
  superseded_by: Expandable<Note> | null
  /**
   *  Identifier of the note that this note supersedes.
   */
  supersedes: Expandable<Note> | null
  /**
   * Timestamp of when the note was created.
   */
  created_at: string
  /**
   * Timestamp of when the note was last updated.
   */
  updated_at: string
  /**
   * Timestamp of when the note was deleted.
   */
  deleted_at: string | null
}

export interface NoteListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Note>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface NoteListParams {
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
  sort?: NoteListParamsSort
  /**
   * Filter results by member. If multiple member ids are provided, notes matching
   * any of the provided members will be returned.
   */
  member?: Array<string>
  /**
   * Filter notes by author. Authors must be provided as a list of user identifiers.
   * If multiple author ids are  provided, notes matching any of the provided authors
   * will be returned.
   */
  author?: Array<string>
  /**
   * Filter notes by encounter. If multiple encounter ids are  provided, notes
   * matching any of the provided encounters will be returned.
   */
  encounter?: Array<string>
  /**
   * Filter results by signed status.
   */
  signed?: boolean
  /**
   * When set to true, superseded notes are included.
   */
  include_superseded?: boolean
  /**
   * When set to true, deleted notes are included.
   */
  include_deleted?: boolean
}

export type NoteListParamsSort = 'created_at' | '-created_at'

export interface NoteCreateParams {
  /**
   * The encounter to which this note belongs
   */
  encounter: string
  /**
   * Required if the caller is an API key and otherwise inferred when called as a
   * user. This is the user ID  of the note's author.
   */
  author?: string
  /**
   * Initial content of the note. By default, the note's content is blank.
   */
  content?: Array<NoteContentNode>
  /**
   * Identifier of the note you wish to supersede.
   */
  supersedes?: string
}

export interface NoteUpdateParams {
  /**
   * Required if the caller is an API key and otherwise inferred when called as a
   * user. This is the user ID  of the note's author. If a user ID not matching the
   * note's author is specified, the request fails.
   */
  author?: string
  /**
   * Content you wish to save in the note. Updating note content creates a new note
   * version, replacing the current  note version.
   */
  content?: Array<NoteContentNode>
}

export interface NoteListVersionsResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<NoteVersion>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface NoteListVersionsParams {
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

export class NoteResource extends Resource {
  /**
   * Lists all notes.
   *
   * By default, this method does not return deleted or superseded notes. You can
   * optionally specify `include_deleted`  to view deleted notes and
   * `include_superseded` to view superseded notes.
   */
  public list(params?: NoteListParams, options?: SourceRequestOptions): Promise<NoteListResponse> {
    return this.source.request('GET', '/v1/notes', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new note and an initial note version.
   *
   * To supersede an existing note, pass the identifier of the original note in the
   * supersedes parameter.
   */
  public create(params: NoteCreateParams, options?: SourceRequestOptions): Promise<Note> {
    return this.source.request('POST', '/v1/notes', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves an existing note by its unique identifier.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Note> {
    return this.source.request('GET', `/v1/notes/${id}`, {
      options,
    })
  }

  /**
   * Updates a note.
   *
   * Only the note's author or an API key acting on behalf of the author can update a
   * note. When the note content is  updated, a new note version is created
   * automatically.
   */
  public update(
    id: string,
    params?: NoteUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Note> {
    return this.source.request('POST', `/v1/notes/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes a note.
   *
   * If a note requires correction or an addendum, supersede the note rather than
   * delete it. Deleting a note should be  reserved for use when correcting notes
   * during a backfill or when a note is associated to the wrong member. Once a  note
   * is deleted, it can no longer be accessed other than via the list all notes
   * endpoint.
   */
  public delete(id: string, options?: SourceRequestOptions): Promise<Note> {
    return this.source.request('DELETE', `/v1/notes/${id}`, {
      contentType: 'json',
      options,
    })
  }

  /**
   * Signs an unsigned note.
   *
   * Only the note's author or an API key acting on behalf of the author can sign a
   * note. Signing a note sets the latest  note version as the final, signed version
   * of the note. Once signed, the note can no longer be modified. If a  correction
   * to a signed note is required, create a new note that supersedes the original.
   */
  public sign(id: string, options?: SourceRequestOptions): Promise<Note> {
    return this.source.request('POST', `/v1/notes/${id}/sign`, {
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves a note version for a given note by its unique identifier.
   */
  public retrieveVersion(
    id: string,
    noteVersionId: string,
    options?: SourceRequestOptions,
  ): Promise<NoteVersion> {
    return this.source.request('GET', `/v1/notes/${id}/versions/${noteVersionId}`, {
      options,
    })
  }

  /**
   * Lists all note versions for a given note.
   */
  public listVersions(
    id: string,
    params?: NoteListVersionsParams,
    options?: SourceRequestOptions,
  ): Promise<NoteListVersionsResponse> {
    return this.source.request('GET', `/v1/notes/${id}/versions`, {
      query: params,
      options,
    })
  }
}
