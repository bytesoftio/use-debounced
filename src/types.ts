export type StateUpdater<TState> = (newState: TState) => void
export type DebouncedStateUpdater<TState> = (newState: TState) => void
export type UseDebounced = <TState = any>(initialState: TState, delay: number) => [TState, TState, StateUpdater<TState>, DebouncedStateUpdater<TState>]
