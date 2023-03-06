const express = require("express");
const path = require("path");


const app = express();

app.use("/static", express.static(path.resolve(__dirname, "app", "static")));

app.get("/index", function (request, response) {
    response.sendFile(__dirname + "/app/index.html")
})

app.get("/schedule", function (request, response) {
    response.sendFile(__dirname + "/app/schedule.html")
})

app.get("/teacher", function (request, response) {
    response.sendFile(__dirname + "/app/teachers.html")
})

app.get("/cabinet", function (request, response) {
    response.sendFile(__dirname + "/app/cabinets.html")
})

// app.use(function (request, response) {
//     response.sendFile(__dirname + "/app/index.html");
// });

app.listen(80);