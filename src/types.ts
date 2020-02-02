export type Id<T> = { [K in keyof T]: T[K] }
export type MergePartial<T, U> = Id<T & Partial<U>>
