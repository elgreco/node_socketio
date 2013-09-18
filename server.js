function server(req, res) {
    if (req.url == "/") {
        ASQ()
            .then(function (done) {
                setTimeout(function () {
                    done(Math.random(10));
                }, 1000);
            })
            .then(function (_, msg) {
                res.writeHead(200, { "Content-type":"text/plain" });
                res.end("Hello there " + msg);
            })
    }
    else if ((/^\/\d+(?=$|[\/?#])/).test(req.url)) {
        req.addListener("end", function(){
            req.url = req.url.replace(/^\/(\d+).*$/, "$1.html");
            static_files.serve(req, res);
        });
        req.resume();
    }
}

var http = require("http"),
    httpServer = http.createServer(server),
    port = 8005
var ASQ = require("asynquence"); // installed with "npm install asynquence" in bash
var node_static = require("node-static"); // installed with "npm install asynquence" in bash
var static_files = new node_static.Server(__dirname);

httpServer.listen(port);
