const fs = require('fs')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err => {
        if (err) console.log(err)
    })
}

const getPostData = (request, callback) => {
    let rawData = "";
    request.on("data", (chunk) => (rawData += chunk));
    request.on("end", () => {
      callback(JSON.parse(rawData));
    });
  };
  
module.exports = {
    writeDataToFile,
    getPostData
}