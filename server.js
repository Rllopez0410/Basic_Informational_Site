let express = require("express");
let server = express();

server.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

server.get("/:fileName", function(req, res) {
    let fileName = req.params.fileName;
    let requested = __dirname + `/${fileName}.html`

    res.sendFile(requested, function(err) {
        if (err) {
            res.status(404)
            res.sendFile(__dirname + "/error.html")
        }
    })
}).listen(8080, () => {
    console.log("server listening");
});