const bodyParser = require("body-parser");
const express = require("express");
var morgan = require("morgan");
const app = express();

//parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//panggil routes
var routes = require("./routes");
routes(app);

//MENU ROUTES FROM INDEX

app.use("/auth", require("./middleware"));

app.listen(3000, () => {
  console.log("Sukses");
});
