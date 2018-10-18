const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();
var maintainanceMode = false;
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//middlewares
app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}  -  ${req.method} -  ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", error => console.log(error));
  next();
});

app.use((req, res, next) => {
  maintainanceMode && res.render("maintainance.hbs");
  next();
});
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home",
    welcomeMessage: "Welcome!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    error: "Error handling the request"
  });
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});