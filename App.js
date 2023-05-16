const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const adminRouter = require("./routes/adminRoutes");
const candidateRouter = require("./routes/candidateRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

//ROUTESLER BURAYA GELECEK
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/candidate", candidateRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
