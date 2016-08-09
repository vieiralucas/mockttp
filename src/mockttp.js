'use strict';

import fs from 'fs';
import restify from 'restify';

const servers = JSON.parse(fs.readFileSync(process.cwd() + '/mockttp.json', 'utf-8'));

servers.forEach(server => {
  const restifyServer = restify.createServer();
  const createReponse = ({ status, data }) => (req, res) => {
    res.status(status);
    res.json(data);
  };

  server.endpoints.forEach(endpoint => {
    const method = endpoint.method.toLowerCase();
    const { pattern, response } = endpoint;

    restifyServer[method](pattern, createReponse(response));
  });

  restifyServer.listen(server.port, () => {
    console.log('%s listening at localhost:%s', server.name, server.port);
  });
});

