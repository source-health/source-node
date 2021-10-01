import { Resource } from '../BaseResource'
import { SourceOptions } from '../Source'

import { User } from './User'

export interface CareTeamParticipants {
  /**
   * The users who is on the care team.
   */
  user: string | User
  /**
   * The role of this user on the care team.
   */
  role: 'clinician' | 'nurse' | 'dietician' | 'ob-gyn'
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
   * The users on the care team. Each user has an associated role on the care team
   * (for example, nurse, endocrinologist, or health ally).
   */
  participants: Array<CareTeamParticipants>
  /**
   * Timestamp of when the care team was created.
   */
  created_at: string
  /**
   * Timestamp of when the care team was last updated.
   */
  updated_at: string
}

export interface CareTeamUpdateParamsParticipants {
  /**
   * Unique ID of the user to add to the care team.
   */
  user: string
  /**
   * Role that this user should have on the care team.
   */
  role: 'clinician' | 'nurse' | 'dietician' | 'ob-gyn'
}

export interface CareTeamUpdateParams {
  /**
   * List of users to put on the care team.
   */
  participants?: Array<CareTeamUpdateParamsParticipants>
}

export class CareTeamResource extends Resource {
  /**
   * Retrieves the details of an existing care team. You need only supply the unique
   * care team identifier that was returned upon creation.
   */
  public retrieve(id: string, options?: SourceOptions): Promise<CareTeam> {
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
    options?: SourceOptions,
  ): Promise<CareTeam> {
    return this.source.request('POST', `/v1/care_teams/${id}`, {
      params,
      options,
    })
  }
}
