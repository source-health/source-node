import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface Thread {
  
  /**
   * Always `thread`.
   */
  readonly object: string
  
  /**
   * Unique ID of the thread.
   */
  readonly id: string
  
  /**
   * The member to which this thread belongs.
   */
  readonly member: string
  
  /**
   * The user who is assigned to the thread and will be notified of new messages.
   */
  readonly assignee: string
  
  /**
   * Current status of the thread.
   */
  readonly status: string
  
  /**
   * Subject of the thread.
   */
  readonly subject: string
  
  /**
   * Timestamp of when the thread was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp of when the thread was last updated.
   */
  readonly updated_at: string
  
  /**
   * Timestamp of when the thread was last closed.
   */
  readonly closed_at: string
}

interface ListAllThreadsParams {
  
  /**
   * A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if
   * you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include
   * ending_before=obj_bar in order to fetch the previous page of the list.
   */
  readonly ending_before?: string
  
  /**
   * A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if
   * you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include
   * starting_after=obj_foo in order to fetch the next page of the list.
   */
  readonly starting_after?: string
  
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100.
   */
  readonly limit?: number
  
  /**
   * Filter threads to only those belonging to the given member.
   */
  readonly member?: string
  
  /**
   * Filter threads to only those assigned to the given user. The value `current` may be used to indicate the currently
   * authenticated user.
   */
  readonly assignee?: string
  
  /**
   * Filter threads by status
   */
  readonly status?: Array<string>
}

interface ListAllThreadsResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<Thread>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}

interface CreateAThreadParams {
  
  /**
   * The ID of the member to which this thread belongs
   */
  readonly member: string
  
  /**
   * The ID of the care team user to which this thread is currently assigned, if any.
   */
  readonly assignee?: string
  
  /**
   * The thread subject.
   */
  readonly subject?: string
}


export class ThreadContext extends BaseContext {
  
  /**
   * Returns a list of threads within the current account.
   * 
   * The threads returned are sorted with the most recently updated appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllThreadsParams, options?: CatalystOptions): Promise<ListAllThreadsResponse> {
    return this.catalyst.request("GET", `/v1/communications/threads`, { 
      params,
      options,
    })
  }
  
  /**
   * Creates a new messaging thread.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateAThreadParams, options?: CatalystOptions): Promise<Thread> {
    return this.catalyst.request("POST", `/v1/communications/threads`, { 
      params,
      options,
    })
  }
  
  /**
   * Retrieves the details of an existing thread. You need only supply the unique thread identifier that was returned upon
   * creation.
   *
   * @param id Unique ID of the thread
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<Thread> {
    return this.catalyst.request("GET", `/v1/communications/threads/${id}`, { 
      options,
    })
  }
  
}