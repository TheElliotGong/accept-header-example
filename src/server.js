const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/cats': responseHandler.getCats,
  '/': responseHandler.getIndex,
  index: responseHandler.getIndex,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');

  const handlerFunction = urlStruct[parsedURL.pathname];
  if (handlerFunction) {
    handlerFunction(request, response, acceptedTypes);
  } else {
    urlStruct.index(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
