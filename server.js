const http = require("http");
const io = require("socket.io");

const api = require("./api");
const sockets = require("./sockets");

const httpServer = http.createServer(api);
const socketsServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

httpServer.listen(PORT);
console.log(`Listening on port ${PORT}`);
sockets.listen(socketsServer);