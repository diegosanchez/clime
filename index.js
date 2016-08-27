const restify = require("restify"),
      bunyan = require("bunyan"),
      cfg = require("node-config-manager");

const forecast = require("./model/forecast");

const cfgServer = cfg
          .addConfig("server")
          .getConfig("server");
var server;

server = restify.createServer({name: cfgServer.name});
server.listen(cfgServer.port);
console.log(JSON.stringify({
    msg: `Server listens on port ${cfgServer.port}`
}));

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

server.get("/v1/health", (req, res, next) => {
    res.send(200);
    next();
});

server.get("/v1/clime", (req, res, next) => {
    res.send({
        when: 0,
        clime: "lluvioso"
    });
});
