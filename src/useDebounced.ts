import { useEffect, useState } from "react"
import { UseDebounced } from "./types"

export const useDebounced: UseDebounced = (value, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const handleValueChanges = () => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }

  useEffect(handleValueChanges, [value, delay])

  return debouncedValue
}
