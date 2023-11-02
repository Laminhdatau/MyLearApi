"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/tampil").get(jsonku.tampilSemuaData);

  app.route("/tampilkan/:id").get(jsonku.getById);

  app.route("/addMhs").post(jsonku.addMhs);
  
  app.route("/updateData").put(jsonku.updateData);
};
