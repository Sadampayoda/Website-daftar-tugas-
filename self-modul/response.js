const fs = require('node:fs');
const path = require('node:path');
const response = (res,path_name,content_type) => {
    const file_name = path.join(__dirname, '..',path_name);
    fs.readFile(file_name, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { "Content-type": content_type });
        res.end(data);
    });
};

module.exports = {response}



