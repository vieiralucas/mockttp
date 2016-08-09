'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var servers = JSON.parse(_fs2.default.readFileSync(process.cwd() + '/mockttp.json', 'utf-8'));

servers.forEach(function (server) {
  var restifyServer = _restify2.default.createServer();
  var createReponse = function createReponse(_ref) {
    var status = _ref.status;
    var data = _ref.data;
    return function (req, res) {
      res.status(status);
      res.json(data);
    };
  };

  server.endpoints.forEach(function (endpoint) {
    var method = endpoint.method.toLowerCase();
    var pattern = endpoint.pattern;
    var response = endpoint.response;


    restifyServer[method](pattern, createReponse(response));
  });

  restifyServer.listen(server.port, function () {
    console.log('%s listening at localhost:%s', server.name, server.port);
  });
});
