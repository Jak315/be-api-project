const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Category = require("../models/Category");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/category", (req, res) => {
  Category.find({}, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.post("/category", jsonParser, (req, res) => {
  const reqBody = req.body;
  let newCategory = new Category({
    _id: mongoose.Types.ObjectId(),
    name: reqBody.name,
    color: reqBody.color,
  });
  newCategory
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Success");
});

router.delete("/category/:id", (req, res) => {
  console.log(req.params.id);
  Category.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.put("/category/:id", jsonParser, (req, res) => {
  // console.log(req.body);
  const id = req.params.id
  console.log(id)
  const body = req.body
  console.log(body)
  Category.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      color: req.body.color,
    },
    function (err, data) {
      if (err) throw err;
      res.json(data);
      // res.send("updated");
    }
  );
  // res.send({ data: "data" });
});

module.exports = router;
