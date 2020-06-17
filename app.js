require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })