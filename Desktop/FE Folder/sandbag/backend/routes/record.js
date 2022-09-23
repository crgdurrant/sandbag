const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new user.
recordRoutes.route("/addUser").post(function (req, response) {
  let db_connect = dbo.getDb("sandbag");
  let myobj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    handicap: parseInt(req.body.handicap),
    email: req.body.email,
    password: req.body.password
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

  // This section checks the credentials and logs the user in
recordRoutes.route("/login/:userEmail").get(function (req, res) {
  let db_connect = dbo.getDb("sandbag");
  const convertedEmail = req.params.userEmail.replace('dot','.').replace('at', '@')
  db_connect
    .collection("users")
    .findOne({email: convertedEmail}, (function (err, result) {
      if (err) throw err;
      res.json(result);
    }))
    ;
 });


 // This section will help you get a list of all the rounds of the logged in user.
recordRoutes.route("/getRounds/:userEmail").get(function (req, res) {
  let db_connect = dbo.getDb("sandbag");
  const convertedEmail = req.params.userEmail.replace('dot','.').replace('at', '@')
  db_connect
    .collection("rounds")
    .find({playerEmail: convertedEmail})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

  // This section will help you submit a new round.
recordRoutes.route("/addRound").post(function (req, response) {
  let db_connect = dbo.getDb("sandbag");
  let myobj = {
    ...req.body
  };
  db_connect.collection("rounds").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 module.exports = recordRoutes;