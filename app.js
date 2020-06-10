const express = require("express");
const mongoConnect = require("./util/database").mongoConnect
const app = express();

mongoConnect(() =>app.listen(8008, () => console.log("Listening on PORT 8008")));