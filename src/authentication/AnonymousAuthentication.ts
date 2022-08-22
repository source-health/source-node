import { Authentication } from './Authentication'

export class AnonymousAuthentication implements Authentication {
  private static instance = new AnonymousAuthentication()

  public createHeaders(): Record<string, string> {
    return {}
  }

  static getInstance(): AnonymousAuthentication {
    return this.instance
  }
}
