export type UseDebounced = <T = any>(initialState: T, delay: number) => [T, T, (newState: T) => void, (newState: T) => void]
