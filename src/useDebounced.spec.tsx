import React from "react"
import { useDebounced } from "./useDebounced"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

describe("useDebounced", () => {
  it("debounces state changes", () => {
    jest.useFakeTimers()

    let _setState
    let _setDebouncedState
    let _renders = 0

    const Test = () => {
      _renders++

      const [state, debouncedState, setState, setDebouncedState] = useDebounced(0, 300)

      _setState = setState
      _setDebouncedState = setDebouncedState

      return (
        <div>{state},{debouncedState}</div>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("div")

    expect(target().text()).toBe("0,0")
    expect(_renders).toBe(1)

    act(() => _setState(1))

    expect(target().text()).toBe("1,0")
    expect(_renders).toBe(2)

    act(() => {jest.runAllTimers()})

    expect(target().text()).toBe("1,1")
    expect(_renders).toBe(3)

    act(() => _setState(2))

    expect(target().text()).toBe("2,1")
    expect(_renders).toBe(4)

    act(() => {jest.runAllTimers()})

    expect(target().text()).toBe("2,2")
    expect(_renders).toBe(5)

    act(() => _setDebouncedState(3))

    expect(target().text()).toBe("3,3")
    expect(_renders).toBe(6)
  })
})
