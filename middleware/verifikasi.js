const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verifikasi() {
  return function (req, res, next) {
    //cek authorization header
    var role = req.body.role;
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];

      //verifikasi
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(401).send({
            auth: false,
            message: "Token tidak terdaftar",
          });
        } else {
          if (role == 1) {
            req.auth = decoded;
            next();
          } else {
            return res.status(401).send({
              auth: false,
              message: "Gagal otorisasi",
            });
          }
        }
      });
    } else {
      return res.status(401).send({
        auth: false,
        message: "Token tidak tersedia",
      });
    }
  };
}

module.exports = verifikasi;
