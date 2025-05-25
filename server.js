let http = require("http");
let url = require("url");
let fs = require("fs");

http.createServer(function(req, res) {
    let reqUrl = url.parse(req.url, true);
    let reqFile = "." + reqUrl.pathname;
    if (reqFile == "./") {
            reqFile = "./index.html";
            console.log("Homepage requested");
    }
        fs.readFile(reqFile, function(err, data) {
        if (err) {
            fs.readFile("./error.html", function(errServer, errData) {
                if (errServer) {
                    res.writeHead(500, {"content-type": "text/html"});
                    res.write("Server not working");
                    console.log("500");
                    return res.end();
                }
                res.writeHead(404, {"content-type": "text/html"});
                res.write(errData);
                console.log("Error page is showing");
                return res.end();
            })
        } else {
            res.writeHead(200, {"content-type": "text/html"});
            res.write(data);
            console.log("request found");
            return res.end();
        }
        
    });
}).listen(8080, () => {
    console.log("Server listening...");
})