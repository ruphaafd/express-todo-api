var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

var accessHeader = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Origin", "http://localhost:4200");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(accessHeader);
app.use(cors());

todos = [
  {
    id: 1,
    task: "Attend the ember Session",
    completed: false
  },
  {
    id: 2,
    task: "Prepare yourself for self-quarantine",
    completed: false
  },
  {
    id: 3,
    task: "Make a grocery list",
    completed: false
  }
];

/* GET home page. */
app.get("/todos", function(req, res) {
  res.json({ todos: todos });
});

app.post("/todos", function(req, res) {
  console.log(req.body);
  todos = [...todos, req.body.todo];
  res.json({ todos: todos });
});

app.get("/todos/:id", function(req, res) {
  var todo = todos.find(item => item.id == req.params.id);
  res.json({ todo: todo });
});

app.delete("/todos/:id", function(req, res) {
  todos = todos.filter(todo => todo.id != req.params.id);
  res.json({ todos: todos });
});

app.put("/todos/:id", function(req, res) {
  todos = todos.map(todo =>
    todo.id == req.params.id ? { ...todo, ...req.body.todo } : todo
  );
  res.json({ todos: todos });
});

app.listen(3000, function(req, res) {
  console.log("server is listening");
});

module.exports = app;
