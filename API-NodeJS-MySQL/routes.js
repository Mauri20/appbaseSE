// creating routes
// importing modules
const express = require("express");
const router = express.Router();

// routes
// main page route
router.get("/", (req, res) => {
  res.send("This is the API page!");
});

// get all questions route
router.get("/questions", (req, res) => {
  req.getConnection((err, conn) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
      conn.query("call sp_getQuestions();", (err, rows) => {
        res.send(rows[0]);
      });
    });
  });
});

// get all answers route
router.get("/answers", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("call sp_getAnswers();", (err, rows) => {
      res.send(rows[0]);
    });
  });
});

// get answer of question route
router.post("/getanswer", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("call sp_getAnswerQ(?);", [req.body.question], (err, rows) => {
      if (err) return res.send(err);
      res.send(rows[0]);
    });
  });
});

// get all answers of question route
router.get("/getanswersQ", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("call sp_getAllAnswerQ();", [req.body.question], (err, rows) => {
      if (err) return res.send(err);
      res.send(rows[0]);
    });
  });
});

//adding a new answer route to save in the database
router.post("/newanswer", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "call sp_addAnswer(?,?);",
      [req.body.question, req.body.answer],
      (err, rows) => {
        if (rows.affectedRows === 1) {
          res.status(200).json({ message: "Answer added!" });
        } else {
          res.status(500).json({ message: "Answer not add!" });
        }
      }
    );
  });
});

//exporting the router
module.exports = router;
