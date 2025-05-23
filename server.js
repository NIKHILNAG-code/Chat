
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.broadcast.emit('chat message', '🟢 A user has joined the chat');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('chat message', '🔴 A user has left the chat');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Chat server running at http://localhost:${PORT}`);
});
