var express = require("express");
var auth = require("./auth");
const verifikasi = require("./verifikasi");
var router = express.Router();

router.post("/api/v1/register", auth.registrasi);

router.post("/api/v1/login", auth.login);

router.get("/api/v1/rahasia", verifikasi(), auth.halamanRahasia);

module.exports = router;
