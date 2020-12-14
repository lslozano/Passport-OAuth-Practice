require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000;
const db = process.env.DB;

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.log("Error connecting to mongo.", err);
  });

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/authRoutes"));

app.listen(port, () => {
  console.log("Server listening on Port 3000");
});