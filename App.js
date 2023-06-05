const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const adminRouter = require("./routes/adminRoutes");
const candidateRouter = require("./routes/candidateRoutes");
const studentRouter = require("./routes/studentRoutes");
const repRouter = require("./routes/repRoutes");
const Student = require("./models/studentModel");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/candidate", candidateRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/rep", repRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
