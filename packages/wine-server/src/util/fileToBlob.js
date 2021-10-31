const fs = require("fs");

const fileToBlob = async (file) => {
  return fs.readFileSync(file, { encoding: "base64" });
};

export default fileToBlob;
