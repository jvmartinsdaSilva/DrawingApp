const PORT = 5000

const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: "http://localhost:5173/"
});


io.on('connection', (socket) => {
  console.log('a user connected');
});


server.listen(PORT, () => {
  console.log('server running at http://localhost:' + PORT);
});