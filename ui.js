"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const FilesMultiSelect = importJsx("./files-multi-select");
const Summary = importJsx("./summary");

const flatMap = (arr, f) => arr.reduce((acc, el) => [...acc, ...f(el)], []);

const App = ({ files, git, reset }) => {
  const [submitted, setSubmitted] = React.useState([]);

  const handleFilesSubmit = items => {
    if (items.length === 0) return;

    const fileNames = flatMap(items, ({ files }) => files);

    if (reset) git.reset(fileNames, () => setSubmitted(items));
    else git.add(fileNames, () => setSubmitted(items));
  };

  return submitted.length === 0 ? (
    <FilesMultiSelect
      files={files}
      onSubmit={handleFilesSubmit}
      reset={reset}
    />
  ) : (
    <Summary files={submitted} reset={reset} />
  );
};

module.exports = App;
