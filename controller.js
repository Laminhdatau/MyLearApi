"use strict";

var response = require("./res");
var db = require("./database");

exports.index = function (req, res) {
  response.ok("APLIKASI REST API KU BERJALAN", res);
};

//GET DATA MHS
exports.tampilSemuaData = function (req, res) {
  db.query("SELECT * FROM mahasiswa", function (err, rows, fields) {
    if (err) {
      response.log(err);
    } else {
      response.ok(rows, res);
    }
  });
};

//GET BY ID
exports.getById = function (req, res) {
  let id = req.params.id;
  db.query(
    "SELECT * FROM mahasiswa where id_mhs=?",
    [id],
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
