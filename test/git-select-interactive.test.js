const {
  cleanString,
  parseFilesInfo,
  relativePath,
  getWorkingDirFilesInfo,
  getIndexFilesInfo
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

describe(cleanString, () => {
  it("should clean string", () => {
    expect(cleanString("test")).toBe("test");

    expect(cleanString('"a a"')).toBe("a\\ a");

    expect(cleanString('"src/foo/bar baz/f o o"')).toBe(
      "src/foo/bar\\ baz/f\\ o\\ o"
    );
  });
});

describe(relativePath, () => {
  it("should return path from current working dir", () => {
    expect(relativePath("/a/b/c", "/a/b/c/d", "f")).toEqual("../f");
    expect(relativePath("/a/b/c", "/a/b", "f")).toEqual("c/f");
  });
});

describe(getWorkingDirFilesInfo, () => {
  it("should work", () => {
    expect(getWorkingDirFilesInfo([])).toEqual([]);
    expect(getWorkingDirFilesInfo(test)).toMatchSnapshot();
  });
});

describe(getIndexFilesInfo, () => {
  it("should work", () => {
    expect(getIndexFilesInfo([])).toEqual([]);
    expect(getIndexFilesInfo(test)).toMatchSnapshot();
  });
});

describe(parseFilesInfo, () => {
  it("should work with index files", () => {
    const indexFiles = getIndexFilesInfo(test);
    expect(parseFilesInfo([])).toEqual([]);
    expect(parseFilesInfo(indexFiles, "", "")).toMatchSnapshot();
  });

  it("should work with working dir files", () => {
    const workingDirFiles = getWorkingDirFilesInfo(test);
    expect(parseFilesInfo([])).toEqual([]);
    expect(parseFilesInfo(workingDirFiles, "", "")).toMatchSnapshot();
  });

  it("should work with working dir files with different paths", () => {
    const workingDirFiles = getWorkingDirFilesInfo(test);
    expect(parseFilesInfo([])).toEqual([]);
    expect(
      parseFilesInfo(workingDirFiles, "/a/b/e/f", "/a/b/c/d")
    ).toMatchSnapshot();
  });
});
