function server(req, res) {
  if (req.url == "/") {
    ASQ()
        .then(function(done){
            setTimeout(function(){
                done(Math.random(10));
            }, 1000);
        })
        .then(function(_, msg){
            res.writeHead(200, { "Content-type": "text/plain" })
            res.end("Hello there " + msg);
        })
    }
}

var http = require("http"),
    httpServer = http.createServer(server),
    port = 8005
    ASQ = require("asynquence"); // installed with "npm install asynquence" in bash

httpServer.listen(port);
