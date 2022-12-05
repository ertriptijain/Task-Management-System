const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const chalk = require("chalk");
const errorHandler = require("errorhandler");
const lusca = require("lusca");
const dotenv = require("dotenv");
const cors = require("cors");
const lodash = require("lodash");
const _ = require("lodash");
const Sentry = require("@sentry/node");

const app = express();

dotenv.config();

global._ = lodash;
// Router
const indexRouter = require("./controllers/index");

app.use(Sentry.Handlers.requestHandler());
require("./shared/service/customExceptionHandler");

app.use(cors());

/**
 * Start Express server.
 */
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
    console.log(
        "%s App is running at http://localhost:%d in %s mode",
        chalk.green("✓"),
        app.get("port"),
        app.get("env")
    );
    console.log("Press CTRL-C to stop\n");
});

app.use(
    logger("dev", {
        // skip: function (req, res) {
        //     return res.statusCode < 400;
        // },
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.disable("x-powered-by");

// access static folder
app.use("/post", express.static("./"));
app.use("/", express.static(path.join(__dirname, "dist"), {maxAge: 31557600000}));

app.use((req, res, next) => {
    // if (process.env.ENVIRONMENT === "development") {
    //     console.log("req body", req.body);
    //     console.log("req query", req.query);
    //     console.log("authorization", req.headers.authorization);
    // }
    next();
});

process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

// Routes
app.use("/", indexRouter);
app.use(Sentry.Handlers.errorHandler());

/**
 * Error Handler.
 */
if (process.env.ENVIRONMENT === "development") {
    app.use(errorHandler());
}
