const bodyParser = require("body-parser");
const express = require("express");

const app = express();

//parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//panggil routes
var routes = require("./routes");
routes(app);

app.listen(3000, () => {
  console.log("Sukses");
});
