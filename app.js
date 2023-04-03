var express = require("express");
const cors = require('cors');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");

var indexRouter = require("./routes/index");
var staffRouter = require("./routes/staff");
var authRouter = require("./routes/auth");

var app = express();
app.use(cors());

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/staff", staffRouter);
app.use("/api/auth", authRouter);

app.listen(3002, () => {
  console.log("server runnin on port 3002");
});

module.exports = app;
