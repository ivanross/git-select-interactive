"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const FilesMultiSelect = importJsx("./files-multi-select");
const Summary = importJsx("./summary");

const App = ({ files, git }) => {
  const [submitted, setSubmitted] = React.useState([]);

  const handleFilesSubmit = items => {
    if (items.length === 0) return;
    const fileNames = items.map(({ label }) => label);
    git.add(fileNames, () => {
      setSubmitted(items);
    });
  };
  return submitted.length === 0 ? (
    <FilesMultiSelect files={files} onSubmit={handleFilesSubmit} />
  ) : (
    <Summary files={submitted} />
  );
};

module.exports = App;
