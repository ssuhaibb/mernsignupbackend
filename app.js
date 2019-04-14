const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");

const users = require('./routes/user');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("database is connected");
  },
  err => {
    console.log("cannot connect to database" + err);
  }
);
const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users',users);

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
