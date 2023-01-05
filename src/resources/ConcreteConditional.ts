export interface ConcreteConditional {
  type: 'concrete_conditional'
  /**
   * The operator to apply in this conditional.
   */
  operator: ConcreteConditionalOperator
  /**
   * The key of the question/response that this conditional is being applied to.
   */
  key: string
  /**
   * The value within the question response that this conditional is being applied
   * to. This must correspond to a path within the given question's response schema.
   * For example, if the question type is `date`, then the path must be 'value',
   * which is the only field in the response schema.
   */
  fact?: string
  /**
   * The argument used to apply the operator to the input. The type of the operator
   * depends on the operator and the input type.
   */
  argument: unknown
}

export type ConcreteConditionalOperator =
  | '$eq'
  | '$ne'
  | '$exists'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$in'
  | '$nin'
  | '$all'
  | '$olderThan'
  | '$youngerThan'
