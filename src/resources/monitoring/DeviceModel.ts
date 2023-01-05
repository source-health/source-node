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
  category: DeviceModelCategory
  /**
   * Capabilities for the device model, determined by types of measurements the
   * device can report.
   */
  capabilities: Array<DeviceModelCapability>
  /**
   * Connectivity type of this device model
   */
  connectivity: DeviceModelConnectivity
}

export type DeviceModelCategory =
  | 'scale'
  | 'blood_pressure_monitor'
  | 'pulse_oximeter'
  | 'blood_glucose_monitor'
export type DeviceModelCapability =
  | 'blood_glucose'
  | 'blood_oxygen_saturation'
  | 'blood_pressure'
  | 'body_weight'
  | 'diastolic_blood_pressure'
  | 'heart_rate'
  | 'systolic_blood_pressure'
export type DeviceModelConnectivity = 'cellular' | 'bluetooth'
