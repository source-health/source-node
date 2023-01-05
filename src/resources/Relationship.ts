import { Resource } from '../BaseResource'
import { SourceRequestOptions } from '../SourceClient'

import { Member } from './Member'
import { Expandable } from './shared'

export interface Relationship {
  /**
   * Always `relationship`.
   */
  object: 'relationship'
  /**
   * Unique ID for the relationship.
   */
  id: string
  /**
   * The member receiving care to whom the relationship applies.
   */
  subject_member: Expandable<Member>
  /**
   * The member acting as the related person for the `member`. For example, if a
   * member consents to their spouse participating in their care, specify the
   * spouse's member ID here.
   */
  authorized_member: Expandable<Member>
  /**
   * Current status of the relationship. By default, newly created relationships have
   * a status of 'active'. When a relationship is in a status of 'inactive', the
   * authorized member can no longer access the member's data.
   */
  status: RelationshipStatus
  /**
   * The type of relationship. If set to 'other', you must provide a description for
   * the relationship.
   */
  type: RelationshipType
  /**
   * A description for this relationship. Use the description to add detail about the
   * relationship, such as whether the related member has power of attorney for the
   * member.
   */
  description: string | null
  /**
   * Timestamp when the relationship was created.
   */
  created_at: string
  /**
   * Timestamp when the relationship was last updated.
   */
  updated_at: string
}

export type RelationshipStatus = 'active' | 'inactive'
export type RelationshipType =
  | 'brother'
  | 'child'
  | 'daughter'
  | 'father'
  | 'friend'
  | 'grandchild'
  | 'grandparent'
  | 'mother'
  | 'parent'
  | 'partner'
  | 'professional_caregiver'
  | 'sibling'
  | 'sister'
  | 'son'
  | 'spouse'
  | 'other'

export interface RelationshipListResponse {
  /**
   * Always `list`.
   */
  object: 'list'
  /**
   * Array of results
   */
  data: Array<Relationship>
  /**
   * Contains `true` if there is another page of results available.
   */
  has_more: boolean
}

export interface RelationshipListParams {
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
   * Limit results to relationships with the given subject member.
   */
  subject_member?: string
  /**
   * Limit results to relationships with the given authorized member.
   */
  authorized_member?: string
  /**
   * Limit results to relationships with the given status. If multiple statuses are
   * provided, relationships matching any of the provided statuses will be returned.
   */
  status?: Array<RelationshipListParamsStatus>
}

export type RelationshipListParamsStatus = 'active' | 'inactive'

export interface RelationshipCreateParams {
  /**
   * The member receiving care to whom the relationship applies.
   */
  subject_member: string
  /**
   * The member acting as the related person for the `member`. For example, if a
   * member consents to their spouse participating in their care, specify the
   * spouse's member ID here.
   */
  authorized_member: string
  /**
   * Current status of the relationship. By default, newly created relationships have
   * a status of 'active'. When a relationship is in a status of 'inactive', the
   * authorized member can no longer access the member's data.
   */
  status: RelationshipCreateParamsStatus
  /**
   * The type of relationship. If set to 'other', you must provide a description for
   * the relationship.
   */
  type: RelationshipCreateParamsType
  /**
   * A description for this relationship. Use the description to add detail about the
   * relationship, such as whether the related member has power of attorney for the
   * member.
   */
  description?: string | null
}

export type RelationshipCreateParamsStatus = 'active' | 'inactive'
export type RelationshipCreateParamsType =
  | 'brother'
  | 'child'
  | 'daughter'
  | 'father'
  | 'friend'
  | 'grandchild'
  | 'grandparent'
  | 'mother'
  | 'parent'
  | 'partner'
  | 'professional_caregiver'
  | 'sibling'
  | 'sister'
  | 'son'
  | 'spouse'
  | 'other'

export interface RelationshipUpdateParams {
  /**
   * Current status of the relationship. By default, newly created relationships have
   * a status of 'active'. When a relationship is in a status of 'inactive', the
   * authorized member can no longer access the member's data.
   */
  status?: RelationshipUpdateParamsStatus
  /**
   * The type of relationship. If set to 'other', you must provide a description for
   * the relationship.
   */
  type?: RelationshipUpdateParamsType
  /**
   * A description for this relationship. Use the description to add detail about the
   * relationship, such as whether the related member has power of attorney for the
   * member.
   */
  description?: string | null
}

export type RelationshipUpdateParamsStatus = 'active' | 'inactive'
export type RelationshipUpdateParamsType =
  | 'brother'
  | 'child'
  | 'daughter'
  | 'father'
  | 'friend'
  | 'grandchild'
  | 'grandparent'
  | 'mother'
  | 'parent'
  | 'partner'
  | 'professional_caregiver'
  | 'sibling'
  | 'sister'
  | 'son'
  | 'spouse'
  | 'other'

export class RelationshipResource extends Resource {
  /**
   * Returns a list of relationships within the current account.
   *
   * The relationships by default are sorted by creation date, with the most recently
   * created relationship appearing first.
   */
  public list(
    params?: RelationshipListParams,
    options?: SourceRequestOptions,
  ): Promise<RelationshipListResponse> {
    return this.source.request('GET', '/v1/relationships', {
      query: params,
      options,
    })
  }

  /**
   * Creates a new relationship between two members. You can create relationships to
   * allow caregivers, family members, or other people to whom the member has
   * consented to participate in the member's care.
   *
   * An active relationship allows members to view information about one another. For
   * example, if Member A is a caregiver for Member B, Member A can view, edit, and
   * create any data for Member B. Member B can view basic demographic information
   * about Member A.
   */
  public create(
    params: RelationshipCreateParams,
    options?: SourceRequestOptions,
  ): Promise<Relationship> {
    return this.source.request('POST', '/v1/relationships', {
      data: params,
      contentType: 'json',
      options,
    })
  }

  /**
   * Retrieves the details of an existing relationship. You need only supply the
   * unique relationship identifier that was returned upon relationship creation.
   */
  public retrieve(id: string, options?: SourceRequestOptions): Promise<Relationship> {
    return this.source.request('GET', `/v1/relationships/${id}`, {
      options,
    })
  }

  /**
   * Updates a relationship between two members.
   *
   * Any parameters not provided are left unchanged. For example, if you pass the
   * status parameter, that becomes the relationship's current status.
   */
  public update(
    id: string,
    params?: RelationshipUpdateParams,
    options?: SourceRequestOptions,
  ): Promise<Relationship> {
    return this.source.request('POST', `/v1/relationships/${id}`, {
      data: params,
      contentType: 'json',
      options,
    })
  }
}
