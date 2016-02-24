var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var courses = [
    {title: "Java 101", seats: 23, start: new Date()},
    {title: "C# 101", seats: 34, start: new Date(2015, 9,4)},
    {title: "Nodejs 101", seats: 90, start: new Date(2016, 9,4)},
];

app.post("/rest/course", function(req, res) {
    var course = req.body;
    courses.push(course);
    res.json(courses);
});

app.delete("/rest/course/:id", function(req, res) {
    var index = req.params["id"];
    courses.splice(index, 1);
    res.json(courses);
});

app.get("/rest/course/:id", function(req, res) {
    var index = req.params["id"];
    res.json(courses[index]);
});

// Creating Reading Updating Deletion (CRUD)
app.get("/rest/course", function(req, res) {

    res.json(courses);
});

app.listen(3000);
