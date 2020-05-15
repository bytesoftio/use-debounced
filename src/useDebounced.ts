import { useRef, useState } from "react"
import { UseDebounced } from "./types"

export const useDebounced: UseDebounced = (initialState, delay: number) => {
  // a reference to the latest state value
  const state = useRef(initialState)
  // a reference to the debounced state value
  const debouncedState = useRef(initialState)
  // used to track and reset timeouts
  const timeout = useRef<any>()
  // used to trigger changes that lead to re-renders
  const [ticks, setTicks] = useState(0)
  // trigger a new tick / re-render
  const triggerTick = () => setTicks(previousTicks => previousTicks + 1)

  const setState = (newState) => {
    if (newState !== state.current) {
      state.current = newState
      updateDebouncedState()
      triggerTick()
    }
  }

  const setDebouncedState = (newState) => {
    state.current = newState
    debouncedState.current = newState
    triggerTick()
  }

  const updateDebouncedState = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      if (state.current !== debouncedState.current) {
        setDebouncedState(state.current)
      }
    }, delay)
  }

  return [state.current, debouncedState.current, setState, setDebouncedState]
}
