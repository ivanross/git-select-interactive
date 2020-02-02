import { cleanString, relativePath, mergeBy } from '../src/utils'

//prettier-ignore
const test = [
  { path: "aa"               , index: " ", working_dir: "D" },
  { path: 'bb -> "dir/bb bb"', index: "R", working_dir: " " },
  { path: "new_file.txt"     , index: "A", working_dir: " " },
  { path: "test"             , index: "M", working_dir: " " },
  { path: "dir/cc"           , index: "?", working_dir: "?" },
  { path: "dir/test"         , index: "?", working_dir: "?" }
]

describe(cleanString, () => {
  it('should clean string', () => {
    expect(cleanString('test')).toBe('test')

    expect(cleanString('"a a"')).toBe('a\\ a')

    expect(cleanString('"src/foo/bar baz/f o o"')).toBe('src/foo/bar\\ baz/f\\ o\\ o')
  })
})

describe(relativePath, () => {
  it('should return path from current working dir', () => {
    expect(relativePath('/a/b/c', '/a/b/c/d', 'f')).toEqual('../f')
    expect(relativePath('/a/b/c', '/a/b', 'f')).toEqual('c/f')
  })
})

describe(mergeBy, () => {
  it('sohuld merge two array of objects', () => {
    const a = [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
    ]
    const b = [
      { a: 1, c: 1 },
      { a: 3, c: 3 },
    ]
    expect(mergeBy(a, b, ({ a }, { c }) => a === c)).toEqual([
      { a: 1, b: 1, c: 1 },
      { a: 2, b: 2 },
    ])
  })
})
