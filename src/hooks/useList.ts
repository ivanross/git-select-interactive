import React from 'react'

export function useList<T>(arr: T[]): [T[], (t: T) => void, (t: T) => void, (ts: T[]) => void] {
  const [state, setState] = React.useState(arr)

  const add = (item: T) => {
    setState(values => [...values, item])
  }

  const remove = (item: T) => {
    setState(values => values.filter(value => value !== item))
  }

  return [state, add, remove, setState]
}
