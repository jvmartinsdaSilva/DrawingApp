const PORT = 5000

const express = require('express');
const { createServer } = require('node:http');
const { emit } = require('node:process');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: "http://localhost:5173/"
});

let dataInfo

io.on('connection', (socket) => {
  if(dataInfo) io.emit("canvasImage", dataInfo)
  socket.on("canvasImage" , data => {
    dataInfo = data
    socket.broadcast.emit("canvasImage", data)
  })
});


server.listen(PORT, () => {
  console.log('server running at http://localhost:' + PORT);
});