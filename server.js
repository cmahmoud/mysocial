const hpp = require("hpp");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const AuthRouter = require("./routes/auth.route");
const UserRouter = require("./routes/user.route");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV;

// middlewares
if (environment === "development") {
    app.use(morgan("dev"));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hpp());

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

app.listen(port, () => {
    console.log(`(MySocial) running on port ${port}...`);
});
