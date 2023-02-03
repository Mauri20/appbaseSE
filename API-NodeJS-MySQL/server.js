// creating API server

// importing modules
const express = require("express");
const mysql = require("mysql2");
const myconn = require("express-myconnection");

// creating an express app
const app = express();
const port = 3000;

//creating a connection to the database
const dbOptions = {
  host: "@localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "test",
};

// using the connection
app.use(myconn(mysql, dbOptions, "single"));

// using the express json middleware
app.use(express.json());

// routes
// creating a GET route
app.get("/", (req, res) => {
  res.send("This is the API page!");
});

// starting the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
