const restify = require("restify"),
      bunyan = require("bunyan"),
      cfg = require("node-config-manager");

const Forecast = require("./model/forecast");

var server,
    serviceName = process.env["SERVICE_NAME"] || "clime",
    servicePort = process.env["PORT"] || 8000;

server = restify.createServer({name: serviceName});
server.listen(servicePort);
console.log( JSON.stringify({
    msg: `Server listens on port ${servicePort}`
}) );

server.pre(restify.pre.userAgentConnection());
server.use(restify.bodyParser());

[ "MethodNotAllowed", "VersionNotAllowed", "UnsupportedMediaType", "after", "uncaughtException"].forEach( (e) => {
    server.on( e, restify.auditLogger({
        body: true,
        log: bunyan.createLogger({
            name: 'audit',
            stream: process.stdout
        })
    }));
});

server.get("/health", (req, res, next) => {
    res.send(200);
    next();
});

server.get("/v1/clime/:year", (req, res, next) => {
    res.send(Forecast.clime(req.params.year));
    next();
});
