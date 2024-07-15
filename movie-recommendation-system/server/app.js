var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reviewsRouter = require("./routes/reviews");
var moviesRouter = require("./routes/movies");
var watchlistRouter = require("./routes/watchlists");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);
app.use("/watchlists", watchlistRouter);

module.exports = app;
