"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/tampil").get(jsonku.tampilSemuaData);

  app.route("/tampil/:id").get(jsonku.getById);

  app.route("/addMhs").post(jsonku.addMhs);

  app.route("/ubah/:id").post(jsonku.ubah);

  app.route("/delete/:id").delete(jsonku.delete);

  app.route("/tampilMk").get(jsonku.tampilGroupMk);
};
