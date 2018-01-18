"use strict";

var http = require("http");
var express = require('express');
var socketIo = require('socket.io');

const app = express();


app.set('view engine', 'pug');

app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/home', (req, res) => {
    res.render('index', {title: "Chat Room"});
});

const server = new http.Server(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log("a client connected!");
    socket.on('chat:message', msg => {
        console.log("Message: " + msg);
        io.emit('chat:message', msg);
    });
    socket.on('disconnect', () => {
        console.log("a client disconnected");
    });
});

server.listen(3000, () => {
    console.log("server started on port 3000");
});