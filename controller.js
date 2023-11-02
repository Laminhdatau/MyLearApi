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

//POST DATA
exports.addMhs = function (req, res) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  db.query(
    "INSERT INTO mahasiswa (nim,nama,jurusan) values(?,?,?)",
    [nim, nama, jurusan],
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Berhasil Menambah Data", res);
      }
    }
  );
};

exports.ubah = function (req, res) {
  var id = req.params.id;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;
  db.query(
    "UPDATE mahasiswa set nim=?,nama=?,jurusan=? where id_mhs=?",
    [nim, nama, jurusan, id],
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Berhasil update", res);
      }
    }
  );
};

exports.delete = function (req, res) {
  var id = req.params.id;
  db.query(
    "DELETE FROM mahasiswa where id_mhs=?",
    [id],
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Berhasil menghapus data", res);
      }
    }
  );
};
