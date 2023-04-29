const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}`);

let readyPlayersCounter = 0;

io.on("connection", (socket) => {
  console.log("A user has connected!", socket.id);

  socket.on("ready", () => {
    console.log(`Player ${socket.id} is ready!`);
    readyPlayersCounter++;
  })

  if(readyPlayersCounter === 2) {
    io.emit("startGame", socket.id);
  }
});
