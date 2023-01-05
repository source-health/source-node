import { Conditional } from './Conditional'

export interface CompoundConditional {
  type: 'compound_conditional'
  /**
   * The operator to apply in this conditional.
   */
  operator: CompoundConditionalOperator
  /**
   * The array of conditionals that will be combined with 'and'/'or' boolean logic to
   * evaluate this conditional.
   */
  operands: Array<Conditional>
}

export type CompoundConditionalOperator = '$and' | '$or'
