let readyPlayersCounter = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");
  pongNamespace.on("connection", (socket) => {
    console.log("A user has connected!", socket.id);

    socket.on("ready", () => {
      console.log(`Player ${socket.id} is ready!`);
      readyPlayersCounter++;
    });

    if (readyPlayersCounter % 2 === 0) {
      pongNamespace.emit("startGame", socket.id);
    }

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Player with id: ${socket.id} has disconnected: ${reason}`);
    });
  });
}

module.exports = { listen };
