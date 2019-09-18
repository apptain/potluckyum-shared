/**
 * @template S The type of state consumed and produced by this reducer.
 * @template A The type of actions the reducer can potentially respond to.
 */
export type DocSet<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}