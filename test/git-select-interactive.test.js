const {
  parseWorkingDirFiles,
  cleanString,
  parseIndexFiles
} = require("../utils");

//prettier-ignore
const test = [
  { path: "aa"               , index: " ", working_dir: "D" },
  { path: 'bb -> "dir/bb bb"', index: "R", working_dir: " " },
  { path: "new_file.txt"     , index: "A", working_dir: " " },
  { path: "test"             , index: "M", working_dir: " " },
  { path: "dir/cc"           , index: "?", working_dir: "?" },
  { path: "dir/test"         , index: "?", working_dir: "?" }
];

describe(parseWorkingDirFiles, () => {
  it("should work", () => {
    expect(parseWorkingDirFiles([])).toEqual([]);

    expect(parseWorkingDirFiles(test)).toMatchSnapshot();
  });
});

describe(cleanString, () => {
  it("should clean string", () => {
    expect(cleanString("test")).toBe("test");

    expect(cleanString('"a a"')).toBe("a\\ a");

    expect(cleanString('"src/foo/bar baz/f o o"')).toBe(
      "src/foo/bar\\ baz/f\\ o\\ o"
    );
  });
});

describe(parseIndexFiles, () => {
  it("should work", () => {
    expect(parseIndexFiles([])).toEqual([]);

    expect(parseIndexFiles(test)).toMatchSnapshot();
  });
});
