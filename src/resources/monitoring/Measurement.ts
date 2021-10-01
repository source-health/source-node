import { Member } from "../Member";
import { Device } from "./Device";
import { Resource } from "../../BaseResource";
import { SourceOptions } from "../../Source";

export interface Measurement {
    /**
     * Always `measurement`.
     */
    object: "measurement";
    /**
     * Unique ID of the measurement.
     */
    id: string;
    /**
     * Member to which this measurement belongs.
     */
    member: string | Member;
    /**
     * The device that reported the reading.
     */
    device: string | Device;
    /**
     * The kind of measurement being reported, which can either be numeric or 
     * composite.
     *
     * If a measurement is of kind numeric, the properties value and unit will be set. 
     * If it is composite, then the items dictionary will be set.
     */
    kind: "numeric" | "composite";
    /**
     * Numeric value of this measurement (non-numeric not supported at this time). 
     * Source always returns measurements as strings to avoid floating-point precision 
     * issues.
     */
    value?: string;
    /**
     * Unit that the measurement is reported in.
     */
    unit?: string;
    /**
     * The type of the measurement
     */
    type: "blood_pressure" | "body_weight" | "diastolic_blood_pressure" | "heart_rate" | "systolic_blood_pressure";
    /**
     * Measurements included in this composite. The key of this dictionary will be the 
     * measurement type alias.
     */
    items: Record<string, unknown>;
    /**
     * Timestamp when the measurement was taken.
     */
    time: string;
    /**
     * Timestamp when the measurement was created.
     */
    created_at: string;
}

export interface MeasurementListResponse {
    /**
     * Always `list`.
     */
    object: "list";
    /**
     * Array of results
     */
    data: Array<Measurement>;
    /**
     * Contains `true` if there is another page of results available.
     */
    has_more: boolean;
}

export interface MeasurementListParamsTime {
    /**
     * Return results where the time field is less than this value.
     */
    lt?: string;
    /**
     * Return results where the time field is less than or equal to this value.
     */
    lte?: string;
    /**
     * Return results where the time field is greater than this value.
     */
    gt?: string;
    /**
     * Return results where the time field is greater than or equal to this value.
     */
    gte?: string;
}

export interface MeasurementListParams {
    /**
     * A cursor for use in pagination. `ending_before` is an object ID that defines 
     * your place in the list. For instance, if you make a list request and receive 100 
     * objects, starting with obj_bar, your subsequent call can include 
     * ending_before=obj_bar in order to fetch the previous page of the list.
     */
    ending_before?: string;
    /**
     * A cursor for use in pagination. `starting_after` is an object ID that defines 
     * your place in the list. For instance, if you make a list request and receive 100 
     * objects, ending with obj_foo, your subsequent call can include 
     * starting_after=obj_foo in order to fetch the next page of the list.
     */
    starting_after?: string;
    /**
     * A limit on the number of objects to be returned. Limit can range between 1 and 
     * 100.
     */
    limit?: number;
    /**
     * A time based range filter on the list based on the object time field. For 
     * example '?time[gt]=2021-05-10T16:51:38.075Z&time[lte]=2021-05-26T16:51:38.075Z'. 
     * The value is a dictionary with the following:
     */
    time?: MeasurementListParamsTime;
    /**
     * Filter measurements to only those belonging to the given member.
     */
    member?: string;
    /**
     * Filter measurements to only those of the given type.
     */
    type?: Array<"blood_pressure" | "body_weight" | "diastolic_blood_pressure" | "heart_rate" | "systolic_blood_pressure">;
}

export class MeasurementResource extends Resource {
    /**
     * Lists all measurements for the current account. The measurements returned are 
     * sorted by     their timestamp, with the most recently created measurements 
     * appearing first.
     */
    public list(params?: MeasurementListParams, options?: SourceOptions): Promise<MeasurementListResponse> {
        return this.source.request("GET", `/v1/measurements`, {
        params,
        options,
        })
    }

    /**
     * Creates a measurement, which can be of kind `numeric` (with a single value) or     
     * kind `composite` (with a collection of logically inseparable values (such as a     
     * blood pressure reading). The shapes of these requests are different.
     */
    public create(params?: unknown, options?: SourceOptions): Promise<Measurement> {
        return this.source.request("POST", `/v1/measurements`, {
        params,
        options,
        })
    }

    /**
     * Return the details of a measurement (a reading from a Device)
     */
    public retrieve(id: string, options?: SourceOptions): Promise<Measurement> {
        return this.source.request("GET", `/v1/measurements/${id}`, {
        options,
        })
    }
}
