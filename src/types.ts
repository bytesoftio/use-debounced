export type StateUpdater<TState> = (newState: TState) => void
export type DebouncedStateUpdater<TState> = (newState: TState) => void
export type UseDebounced = <TState = any, TDebouncedState = TState>(initialState: TState, delay: number) => [TState, TDebouncedState, StateUpdater<TState>, DebouncedStateUpdater<TState>]
