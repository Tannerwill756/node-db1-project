const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((acct) => {
      res.status(200).json({ data: acct });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then((acct) => {
      if (acct) {
        res.status(200).json({ data: acct });
      } else {
        res.status(404).json({ message: "No account with that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messag: err.message });
    });
});

router.post("/", (req, res) => {
  if (req.body.name && req.body.budget) {
    if (typeof req.body.budget != "string") {
      db("accounts")
        .insert(req.body, "id")
        .then((ids) => {
          res.status(201).json({ data: ids });
        })
        .catch((err) => {
          res.status(500).json({ messag: err.message });
        });
    } else {
      res
        .status(400)
        .json({ message: "Budget must be an integer not a string" });
    }
  } else {
    res
      .status(400)
      .json({ message: "please provide a Name and Budget for the post" });
  }
});

module.exports = router;
