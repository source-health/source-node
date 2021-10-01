export interface DeviceModel {
  /**
   * Always `device_model`.
   */
  object: 'device_model'
  /**
   * Unique ID of the device model.
   */
  id: string
  /**
   * Manufacturer of the device model.
   */
  manufacturer: string
  /**
   * Model number of the device model
   */
  model_number: string
  /**
   * Category of the device model.
   */
  category: 'scale' | 'blood_pressure_monitor'
  /**
   * Capabilities for the device model, determined by types of measurements the
   * device can report.
   */
  capabilities: Array<
    | 'blood_pressure'
    | 'body_weight'
    | 'diastolic_blood_pressure'
    | 'heart_rate'
    | 'systolic_blood_pressure'
  >
  /**
   * Connectivity type of this device model
   */
  connectivity: 'cellular' | 'bluetooth'
}
