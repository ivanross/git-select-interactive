import path from 'path'
import { MergePartial } from './types'

export function mergeBy<T, U>(arr1: T[], arr2: U[], match: (t: T, u: U) => boolean) {
  return arr1.map<MergePartial<T, U>>(obj => {
    const mergeable = arr2.find(o => match(obj, o))
    return (mergeable ? { ...mergeable, ...obj } : obj) as MergePartial<T, U>
  })
}

export const flatMap = <T, U>(arr: T[], f: (t: T) => U[]): U[] =>
  arr.reduce<U[]>((acc, el) => [...acc, ...f(el)], [])

export function cleanString(str: string) {
  let s = ''
  for (const c of str) {
    if (c === '"') continue
    if (c === ' ') s += '\\ '
    else s += c
  }
  return s
}

export function relativePath(from: string, to: string, filePath: string) {
  return path.relative(to, path.join(from, filePath))
}
