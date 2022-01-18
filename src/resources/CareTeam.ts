import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { User } from './User'
import { Expandable } from './shared'

export interface CareTeamParticipant {
  /**
   * The user on the care team. Only users with care team roles will be eligible for
   * automatic routing of tasks.
   */
  user: Expandable<User>
}

export interface CareTeam {
  /**
   * Always `care_team`.
   */
  object: 'care_team'
  /**
   * Unique ID of the care team.
   */
  id: string
  /**
   * Member to which this care team is assigned.
   */
  member: string | null
  /**
   * The users on the care team. The user's care team role defines their role across
   * all teams they are on.
   */
  participants: Array<CareTeamParticipant>
  /**
   * Timestamp of when the care team was created.
   */
  created_at: string
  /**
   * Timestamp of when the care team was last updated.
   */
  updated_at: string
}

export interface CareTeamUpdateParamsParticipant {
  /**
   * Unique ID of the user to add to the care team. The user must have a care team
   * role defined.
   */
  user: string
}

export interface CareTeamUpdateParams {
  /**
   * List of users to put on the care team.
   */
  participants?: Array<CareTeamUpdateParamsParticipant>
}

export class CareTeamResource extends Resource {
  /**
   * Retrieves the details of an existing care team. You need only supply the unique
   * care team identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<CareTeam> {
    return this.source.request('GET', `/v1/care_teams/${id}`, {
      options,
    })
  }

  /**
   * Updates the specified care team by setting the values of the parameters passed.
   *
   * Any parameters not provided will be left unchanged. For example, if you pass the
   * member parameter, that assigns the care team to the given member.
   */
  public update(
    id: string,
    params?: CareTeamUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<CareTeam> {
    return this.source.request('POST', `/v1/care_teams/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
