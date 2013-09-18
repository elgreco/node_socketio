function server(req, res) {
    if ((/^\/\d+(?=$|[\/?#])/).test(req.url)) {
        req.addListener("end", function(){
            req.url = req.url.replace(/^\/(\d+).*$/, "$1.html");
            static_files.serve(req, res);
        });
        req.resume();
    }
}

function connection(socket){
    function disconnect(){
        console.log("diconnected");
    }

    function getMsg(msg) {
        socket.broadcast.emit("broadcast", msg);
    }

    socket.on("disconnect", disconnect);
    socket.on("msg", getMsg);

    var intv = setInterval(function(){
        socket.emit("hello", Math.random());
    }, 1000);
};

var http = require("http"),
    httpServer = http.createServer(server),
    port = 8005,
    ASQ = require("asynquence"), // installed with "npm install asynquence" in bash
    node_static = require("node-static"), // installed with "npm install asynquence" in bash
    static_files = new node_static.Server(__dirname),
    io = require("socket.io").listen(httpServer)
    ;

io.configure(function(){
    io.enable("browser client minification");
    io.enable("browser client etag");
    io.set("log level", 1);
    io.set("transports", ["websocket", "xhr-polling", "jsonp-polling"]);
});

httpServer.listen(port);

io.on("connection", connection);
