var db = require("../database");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// CREATE REGISTER
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
  };

  var query = "select email from ?? where ??=?";
  var table = ["user", "email", post.email];
  query = mysql.format(query, table);

  db.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];

        query = mysql.format(query, table);
        db.query(query, post, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            response.ok("BERHASIL MENAMBAH USER BARU", res);
          }
        });
      } else {
        response.ok("Email sudah terdaftar", res);
      }
    }
  });
};

//CONTROLLER LOGIN
exports.login = function (req, res) {
  var post = {
    email: req.body.email,
    password: req.body.password,
  };

  var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var table = ["user", "email", post.email, "password", md5(post.password)];

  query = mysql.format(query, table);

  db.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });
        id_user = rows[0].id_user;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];

        query = mysql.format(query, table);

        db.query(query, data, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              success: true,
              message: "Token Di generate",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({
          Error: true,
          Message: "Email atau password salah",
        });
      }
    }
  });
};
