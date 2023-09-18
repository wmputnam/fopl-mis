const Module = require("module");
const fs = require("fs");

const resolveTextFile = function (module, path) {
  const content = fs.readFileSync(path).toString();
  module.exports = content;
};

Module._extensions[".html"] = resolveTextFile;
Module._extensions[".css"] = resolveTextFile;