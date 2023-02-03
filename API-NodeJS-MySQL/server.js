// creating API server

// importing modules
const express = require("express");
const mysql = require("mysql2");
const myconn = require("express-myconnection");

// importing routes
const routes = require("./routes");

// creating an express app
const app = express();
const port = 5000;

//creating a connection to the database
const dbOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "test",
};

// using the connection
app.use(myconn(mysql, dbOptions, "single"));

// Middlewares
app.use(express.json());
app.use("/api", routes);

// routes
// main page route
app.get("/", (req, res) => {
  res.send("This is Main page!");
});

// starting the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
