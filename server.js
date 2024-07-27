const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3001;

app.get('/api/vehicle-location', (req, res) => {
  res.json({ lat: 37.7749, lng: -122.4194 }); // Example coordinates (San Francisco)
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Emit location data at intervals (this should be replaced with actual tracking logic)
  setInterval(() => {
    socket.emit('locationUpdate', { lat: 37.7749, lng: -122.4194 });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
