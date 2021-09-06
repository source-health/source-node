import { BaseContext } from '../BaseContext'
import type { CatalystOptions } from '../Catalyst'

/* eslint-disable @typescript-eslint/no-namespace */

export interface Measurement {
  readonly id: string
  readonly member: string
}

interface MeasurementListParams {
  type?: string[]
}

export class MeasurementContext extends BaseContext {
  /**
   * Something about this prop
   */
  public list(params?: MeasurementListParams, options?: CatalystOptions): Promise<Measurement> {
    return this.catalyst.request('GET', '/v1/measurements', {
      params,
      options,
    })
  }
}
