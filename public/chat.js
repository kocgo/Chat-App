// Make connection
const socket = io.connect('153.19.196.137:4000');

// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// Emit Events
btn.addEventListener('click', () => {
  // First parameter is the name of the message we need to give
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
});

// FeedBack Listener
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});


// Listen for Events
socket.on('chat', (data) => {
  feedback.innerHTML = "";
  output.innerHTML += "<p><strong>"+ data.handle +":</strong> "+ data.message + "</p>"
});

socket.on('typing', (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>"
});
