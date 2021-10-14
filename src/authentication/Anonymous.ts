import { Authentication } from './Authentication'

export class Anonymous implements Authentication {
  private static instance = new Anonymous()

  public createHeaders(): Record<string, string> {
    return {}
  }

  static getInstance(): Anonymous {
    return this.instance
  }
}
