const compression = require('compression');
// Require Express
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
// Create an Express App
const app = express();
const server = http.createServer(app);
app.use(compression());
// Set the public directory as the root of the application
app.use(express.static(__dirname + '/public'));

// Create a route for the home page
app.get('/', (req, res) => {
  res.render('index.html');//i
});

const io = new Server(server);

io.on('connection', (socket) => {
  let id = socket.id;
  console.log(`user-- ${id} --connected`);
  socket.on('disconnect', () => {
    console.log(`user-- ${id} --disconnected`)
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});