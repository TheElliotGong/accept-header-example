const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getCats = (request, response, acceptedTypes) => {
  const cat = { name: 'Mr. Cat', age: 8 };
  // Send xml if requested.
  if (acceptedTypes[0] === 'text/xml') {
    let xmlResponse = '<response>';
    xmlResponse = `${xmlResponse}<name>${cat.name}</name>`;
    xmlResponse = `${xmlResponse}<age>${cat.age}</age>`;
    xmlResponse = `${xmlResponse}/response>`;
    return respond(request, response, xmlResponse, acceptedTypes[0]);
  }
  // By default, server response is in JSON.
  const catString = JSON.stringify(cat);
  return respond(request, response, catString, 'application/json');
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  getIndex, getCats,
};
