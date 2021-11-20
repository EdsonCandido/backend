/**
 * Module dependencies.
 */
require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const debug = require("debug")("backend-central:server");
const logger = require("morgan");
const path = require("path");
const http = require("http");
const cors = require("cors");

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
 * Enable on cors in application
 */
app.use(cors());

/**
 * Open socket for application
 */

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.clear();
  console.log(":: SERVER RUNNING IN PORT: " + port + " ::");
});
server.on("error", onError);
server.on("listening", onListening);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

/**
 * Import to parcial routes the application
 */
const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const typesRouter = require("./routes/types");
const companyRouter = require("./routes/company");
const roomRouter = require("./routes/rooms");
const userTypeRouter = require("./routes/user_types");
const totemRouter = require("./routes/totem");

/** Path Routes */
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/types", typesRouter);
app.use("/users", usersRouter);
app.use("/companies", companyRouter);
app.use("/rooms", roomRouter);
app.use("/permissions", userTypeRouter);
app.use("/totem", totemRouter);

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
/**
 * The socket was initialized below,
 * but failed to integrate with routes,
 * so a service was created to be able to do database operations
 * and has the room route for reporting operations onwards.
 */

/**
 * Services Room
 */

const RoomService = require("./services/RoomService");
const TotemController = require("./controllers/TotemController");
const ClerkController = require("./controllers/ClerkController");
/**
 * Socket
 */
const io = new Server(server, {
  cors: { origin: "*" },
});
io.sockets.on("connection", async function (socket) {
  console.log("New connect =>" + socket.id);
  socket.emit("me", "Segundo os beatles, 'HELP'");

  /**
   * Receive in call the totem
   * data: {
   *  key
   *       }
   */
  socket.on("subscribe", async (data) => {
    console.log("Esse usuário entrou =>", data);
    const totem_id = data.key;
    const totem = await TotemController.findOne(totem_id);
    const clerk = await ClerkController.findOneFree();
    if (data.interpreter == 1) {
      console.log("Gerar sala com interpreter");
    }
    const room_info = await RoomService.createRoom(totem, clerk, interpreter);

    socket.emit("me", `${room_info.id}`);
    socket.join(`${room_info.id}`);

    console.info("Created room and run in =>", room_info.id);
  });

  /**
   * Liga para um atendente que esteja disponivel
   */
  socket.on("call_user", async (data) => {
    const room_info = await RoomService.findOneRoomActive(data);
    io.sockets.in(room_info.id).emit("call_user", data);
  });
  /**
   * O atendente atende a chamada
   */
  socket.on("answer_call", async (data) => {
    const key = data.room_id;
    await RoomService.callAccepted(key);
    const room_info = await RoomService.callConnectRoom(data);
    io.sockets.in(room_info.id).emit("call_accepted", data.sinal);
  });

  socket.on("call_disconnect", async (data) => {
    // Rooms.connectCall(data);
    let room_info = await RoomService.findOneRoom(data);
    /**Emite um evento para quem esta na sala  */
    io.sockets.in(room_info.id).emit("call_ended");
    // socket.broadcast.emit("call_ended");
    // socket.disconnect(socket.id);
    console.log("Disconnect. socket " + socket.id);
    console.log(await RoomService.finishRoom(data));
  });
});
