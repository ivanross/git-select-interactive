const { parseWorkingDirFiles } = require("../utils");

describe(parseWorkingDirFiles, () => {
  it("should work", () => {
    expect(parseWorkingDirFiles([])).toEqual([]);

    const input = [
      { path: "a", working_dir: "?" },
      { path: "b", working_dir: "M" },
      { path: "c", working_dir: "D" },
      { path: "d", working_dir: "R" },
      { path: "e", working_dir: "X" },
      { path: "f", working_dir: " " }
    ];

    expect(parseWorkingDirFiles(input)).toMatchSnapshot();
  });
});
