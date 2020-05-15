# @bytesoftio/use-debounced

## Installation

`yarn add @bytesoftio/use-debounced` or `npm install @bytesoftio/use-debounced`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

Sometimes you might want to react to changes of a value, for example when building a live search. The user types into the search box, but you don't want to make an API call every 10 milliseconds, so you need to debounce that input somehow. This is where this package comes in handy, it allows you to create a debounced version of a certain value.

## Usage

A basic example of how this package might be used when building some sort of a live search functionality. 

```tsx
import React from "react"
import { useDebounced } from "@bytesoftio/use-debounced"
import { useAsync } from "@bytesoftio/use-async"

const findSomethingSomewhere = (query: string) => { /* some api call implementation */ }
  
const Example = () => {
  // "input" contains the latest value
  // "debouncedInput" contains a debounced version of "input", it will not change more than once every 300 milliseconds
  // "setInput" is used to update "input", the "debouncedValue" will not update immediately since it is debounced by 300 milliseconds
  // "setDebouncedInput" will update the "input" as well as its debounced version "debouncedInput" immediately
  const [input, debouncedInput, setInput, setDebouncedInput] = useDebounced("", 300)
  const [searchResult, loading, error] = useAsync(() => {
    if (debouncedInput.trim() === "") return undefined
    
		return findSomethingSomewhere(debouncedInput)
  }, [debouncedInput])
  
  return (
		<div>
      <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
      
      { ! searchResult && ! loading && <span>Type something into the search box</span>}
      { loading && <span>Loading...</span>}
      { error && <span>There was an error: { error.message }</span>}
      { searchResult && <pre>{ JSON.stringify(searchResult) }</pre>}
    </div>
  )
}
```
