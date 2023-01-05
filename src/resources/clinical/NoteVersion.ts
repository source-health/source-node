import { ApiKey } from '../ApiKey'
import { NoteContentNode } from '../NoteContentNode'
import { User } from '../User'
import { Expandable } from '../shared'

import { Note } from './Note'

export interface NoteVersion {
  /**
   * Always `note_version`.
   */
  object: 'note_version'
  /**
   * Unique ID for the note version.
   */
  id: string
  /**
   * Parent note of this note version
   */
  note: Expandable<Note>
  /**
   * The type of author of this note version. If the type is `system`, this note
   * version was automatically created by the system, for example in order to
   * populate references to other resources within the structure of the note.
   */
  author_type: NoteVersionAuthorType
  /**
   * Author of this note version. The author must always be a user.
   */
  author: Expandable<User> | null
  /**
   * The API key who created the note version on behalf of the author. If null, the
   * note version's author was not impersonated.
   */
  impersonated_by: Expandable<ApiKey> | null
  /**
   * Version number of this note version. The version number is automatically
   * incremented by the system when a new note version is created.
   */
  version: number
  /**
   * Content of the note version. The content can consist of text and structured
   * data. Keep in mind that the content structure is subject to change over time as
   * note features are developed.
   */
  content: Array<NoteContentNode>
  /**
   * Timestamp of when the note version was created.
   */
  created_at: string
  /**
   * Timestamp of when the note version was last updated.
   */
  updated_at: string
}

export type NoteVersionAuthorType = 'user' | 'system'
