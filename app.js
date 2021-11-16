/**
 * Module dependencies.
 */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("backend-central:server");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

/**
 * Import database from application
 */

require("./database");
/**
 * Create instance express
 */
const app = express();

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "5555");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log(":: SERVER RUNNING IN PORT: " + port + " ::");
});
server.on("error", onError);
server.on("listening", onListening);
/**
 * Enable on cors in application
 */
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

/**
 * Enable socket for all routes
 */

app.use((req, res, next) => {
  req.io = io;
  return next();
});

/**
 * Enable on cors in application
 */
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

/**
 * Import to parcial routes the application
 */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const typesRouter = require("./routes/types");
const companyRouter = require("./routes/company");
const roomRouter = require("./routes/rooms");
const userTypeRouter = require("./routes/user_types");

/** Path Routes */
app.use("/", indexRouter);
app.use("/types", typesRouter);
app.use("/users", usersRouter);
app.use("/companies", companyRouter);
app.use("/rooms", roomRouter);
app.use("/permissions", userTypeRouter);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
