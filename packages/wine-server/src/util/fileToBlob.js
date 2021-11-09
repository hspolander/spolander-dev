const fs = require('fs');

const fileToBlob = async (file) => fs.readFileSync(file, { encoding: 'base64' });

export default fileToBlob;
