import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { File } from './File'
import { Task } from './Task'
import { User } from './User'
import { Expandable } from './shared'

export interface Comment {
  /**
   * Always `comment`.
   */
  object: 'comment'
  /**
   * Unique ID for the comment.
   */
  id: string
  /**
   * Markdown formatted contents of the comment. Comments support limited Markdown
   * syntax.
   */
  text: string
  /**
   * The ID of the resource to which the comment is related. Currently, comments are
   * only supported on tasks.
   */
  resource: Expandable<Task>
  /**
   * Text contents of the comment.
   */
  author: Expandable<User>
  /**
   * Any attachments related to this comment. Currently, only file attachments are
   * supported.
   */
  attachments: Array<Expandable<File>>
  /**
   * List of users that were mentioned in this comment. Mentions are automatically
   * detected by scanning the markdown text content for links to the mention://
   * scheme.
   */
  mentioned_users: Array<Expandable<User>>
  /**
   * Timestamp when the comment was created.
   */
  created_at: string
  /**
   * Timestamp when the comment was last updated.
   */
  updated_at: string
  /**
   * Timestamp when the comment was deleted. This will only be returned if the
   * comment is deleted.
   */
  deleted_at?: string
}

export interface CommentListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Comment>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface CommentListParams {
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
  sort?: CommentListParamsSort
}

export type CommentListParamsSort = 'created_at' | '-created_at'

export interface CommentCreateParams {
  /**
   * Markdown formatted contents of the comment. Comments support limited Markdown
   * syntax.
   */
  text: string
  /**
   * Any attachments related to this comment. Currently, up to five file attachments
   * are supported.
   */
  attachments?: Array<string>
}

export interface CommentUpdateParams {
  /**
   * Markdown formatted contents of the comment. Comments support limited Markdown
   * syntax.
   */
  text?: string
  /**
   * Any attachments related to this comment. Currently, up to five file attachments
   * are supported.
   */
  attachments?: Array<string>
}

export class CommentResource extends Resource {
  /**
   * Returns a list of all comments related to a task.
   *
   * The comments returned are sorted by creation date, with the most recently added
   * comments appearing first.
   */
  public list(
    taskId: string,
    params?: CommentListParams,
    options?: SourceRequestOptions,
  ): Promise<CommentListResponse> {
    return this.source.request('GET', `/v1/tasks/${taskId}/comments`, {
      query: params,
      options,
    })
  }

  /**
   * Creates a new comment on a task.
   */
  public create(
    taskId: string,
    params: CommentCreateParams,
    options?: SourceRequestOptions,
  ): Promise<Comment> {
    return this.source.request('POST', `/v1/tasks/${taskId}/comments`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Finds a comment on a task
   */
  public retrieve(taskId: string, id: string, options?: SourceRequestOptions): Promise<Comment> {
    return this.source.request('GET', `/v1/tasks/${taskId}/comments/${id}`, {
      options,
    })
  }

  /**
   * Updates an existing comment on a task.
   */
  public update(
    taskId: string,
    id: string,
    params?: CommentUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Comment> {
    return this.source.request('POST', `/v1/tasks/${taskId}/comments/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Deletes the specified comment. A deleted comment is no longer visible.
   */
  public delete(taskId: string, id: string, options?: SourceRequestOptions): Promise<Comment> {
    return this.source.request('DELETE', `/v1/tasks/${taskId}/comments/${id}`, {
      contentType: 'json',
      options,
    })
  }
}
