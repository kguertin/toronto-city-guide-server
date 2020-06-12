const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnect = require("./util/database").mongoConnect

const app = express();
const PORT = 5000;

const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use(authRoutes);

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
});