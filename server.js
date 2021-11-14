const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index')
});

io.on('connection', (socket) => {
    console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
            console.log('message: ' + msg);
          });
  });

server.listen(3000, () => {
  console.log('listening on port:3000');
});