const express = require('express');
const socket = require('socket.io');

// App Setup
const app = express();
const server = app.listen(4000, () => {
  console.log('Listening to requests on port 4000');
});


// Static Files
app.use(express.static('public'));

// Socket Setup
let io = socket(server);

io.on('connection', (socket) => {
  console.log('Made Socket Connection', socket.id)

// LISTENING TO MESSAGE
// chat is the listened name, data is what is being recieved from it
  socket.on('chat', (data) => {
    io.emit('chat', data);
  })

  socket.on('typing', (data) => {
  // Broadcast the data to every client except the original
    socket.broadcast.emit('typing', data);
  })
})
