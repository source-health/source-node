import { CompoundConditional } from './CompoundConditional'

export interface EarlyExitPoint {
  type: 'early_exit_point'
  /**
   * Indicates which exit screen to display if the conditions are met.
   */
  exit_screen_key: string
  /**
   * A 'compound' conditional (in contrast to a 'concrete' one) takes a set of other
   * conditionals and applies the give '$or' or '$and' condition to combine them.
   *
   * The operands may be concrete conditionals or compound ones, allowing nested
   * 'and'/'or' combinations.
   */
  conditional: CompoundConditional
}
