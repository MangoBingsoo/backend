const express = require("express");
const path = require("path");
const db = require("./mongodb");
const port = process.env.PORT || 8006;
let app = express();
const route = require("./routes/index.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "index.html"));
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

db();

app.use(express.static(path.join(__dirname, "html")));
app.use("/", route);

app.listen(port, () => {
  console.log(`http://localhost:${port} <-- here`);
});
