import { Resource } from "../BaseResource";
import { SourceOptions } from "../Source";

export interface Account {
    /**
     * Always `account`.
     */
    object: "account";
    /**
     * Unique ID of the account.
     */
    id: string;
    /**
     * Name for the account.
     */
    name: string;
    /**
     * Subdomain for the account.
     */
    subdomain: string;
    /**
     * Test mode API secret key for the account, only returned during account creation.
     */
    test_secret_key?: string;
    /**
     * Live mode API secret key for the account, only returned during account creation.
     */
    live_secret_key?: string;
    /**
     * Timestamp when the account was created.
     */
    created_at: string;
    /**
     * Timestamp when the account was last updated.
     */
    updated_at: string;
}

export interface AccountUpdateParams {
    /**
     * Name for the account.
     */
    name?: string;
    /**
     * Subdomain for the account.
     */
    subdomain?: string;
}

export class AccountResource extends Resource {
    /**
     * Retrieves the details of an account.
     *
     * Supply the unique identifier of the account, or `current` to access your current 
     * account.
     */
    public retrieve(id: string, options?: SourceOptions): Promise<Account> {
        return this.source.request("GET", `/v1/accounts/${id}`, {
        options,
        })
    }

    /**
     * Updates an account. At this time you can only update the account name and 
     * subdomain.
     *
     * Any parameters that are not provided in the request will be left unchanged.
     */
    public update(id: string, params?: AccountUpdateParams, options?: SourceOptions): Promise<Account> {
        return this.source.request("POST", `/v1/accounts/${id}`, {
        params,
        options,
        })
    }
}
