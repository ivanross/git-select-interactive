export type Id<T> = { [K in keyof T]: T[K] }
export type MergePartial<T, U> = Id<T & Partial<U>>
export type KeysOf<T> = keyof T
export type ValuesOf<T> = T[keyof T]

export type Action = 'unstage' | 'stage' | 'stash'
