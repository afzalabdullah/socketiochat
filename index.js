const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send("Server is running bro");
});

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data);
    });

    userSocket.on("typing", (data) => {
        userSocket.broadcast.emit("typing", data);
    });

    userSocket.on("stop_typing", (data) => {
        userSocket.broadcast.emit("stop_typing", data);
    });
});

http.listen(8080, () => {
    console.log("Server is running on port 8080");
});