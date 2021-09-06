import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'


interface CareTeamstaff {
  
  /**
   * The users who is on the care team.
   */
  readonly user: string
  
  /**
   * The role of this user on the care team.
   */
  readonly role: string
}

interface CareTeam {
  
  /**
   * Always `care_team`.
   */
  readonly object: string
  
  /**
   * Unique ID of the care team.
   */
  readonly id: string
  
  /**
   * Member to which this care team is assigned.
   */
  readonly member: string
  
  /**
   * The users on the care team. Each user has an associated role on the care team (for example, nurse, endocrinologist, or
   * health ally).
   */
  readonly staff: Array<CareTeamstaff>
  
  /**
   * Timestamp of when the care team was created.
   */
  readonly created_at: string
  
  /**
   * Timestamp of when the care team was last updated.
   */
  readonly updated_at: string
}

interface CreateACareTeamParamsstaff {
  
  /**
   * Unique ID of the user to add to the care team.
   */
  readonly user: string
  
  /**
   * Role that this user should have on the care team.
   */
  readonly role: string
}

interface CreateACareTeamParams {
  
  /**
   * Unique ID of the member this care team serves.
   */
  readonly member: string
  
  /**
   * List of users to put on the care team.
   */
  readonly staff?: Array<CreateACareTeamParamsstaff>
}

interface UpdateACareTeamParamsstaff {
  
  /**
   * Unique ID of the user to add to the care team.
   */
  readonly user: string
  
  /**
   * Role that this user should have on the care team.
   */
  readonly role: string
}

interface UpdateACareTeamParams {
  
  /**
   * Unique ID of the member this care team serves.
   */
  readonly member?: string
  
  /**
   * List of users to put on the care team.
   */
  readonly staff?: Array<UpdateACareTeamParamsstaff>
}

interface ListAllCareTeamsParams {
  
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
}

interface ListAllCareTeamsResponse {
  
  /**
   * Always `list`.
   */
  readonly object: string
  
  /**
   * Array of results
   */
  readonly data: Array<CareTeam>
  
  /**
   * Contains `true` if there is another page of results available.
   */
  readonly has_more: boolean
}


export class CareTeamContext extends BaseContext {
  
  /**
   * Creates a new care team and registers it with Catalyst.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async create(params: CreateACareTeamParams, options?: CatalystOptions): Promise<CareTeam> {
    return this.catalyst.request("POST", `/v1/care_teams`, { 
      params,
      options,
    })
  }
  
  /**
   * Retrieves the details of an existing care team. You need only supply the unique care team identifier that was returned
   * upon creation.
   *
   * @param id Unique ID of the care_team
   * @param options Options to apply to this specific request
   */
  public async retrieve(id: string, options?: CatalystOptions): Promise<CareTeam> {
    return this.catalyst.request("GET", `/v1/care_teams/${id}`, { 
      options,
    })
  }
  
  /**
   * Updates the specified care team by setting the values of the parameters passed.
   * 
   * Any parameters not provided will be left unchanged. For example, if you pass the member parameter, that assigns the care
   * team to the given member.
   *
   * @param id Unique ID of the care_team
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async update(id: string, params?: UpdateACareTeamParams, options?: CatalystOptions): Promise<CareTeam> {
    return this.catalyst.request("POST", `/v1/care_teams/${id}`, { 
      params,
      options,
    })
  }
  
  /**
   * Deletes the care team from your account
   *
   * @param id Unique ID of the care_team
   * @param options Options to apply to this specific request
   */
  public async delete(id: string, options?: CatalystOptions): Promise<CareTeam> {
    return this.catalyst.request("DELETE", `/v1/care_teams/${id}`, { 
      options,
    })
  }
  
  /**
   * Returns a list of care teams within the current account.
   * 
   * The care teams returned are sorted by creation date, with the most recently added task appearing first.
   *
   * @param params Parameters for this operation
   * @param options Options to apply to this specific request
   */
  public async list(params?: ListAllCareTeamsParams, options?: CatalystOptions): Promise<ListAllCareTeamsResponse> {
    return this.catalyst.request("GET", `/v1/care_teams/`, { 
      params,
      options,
    })
  }
  
}