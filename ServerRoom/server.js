const express = require('express');
const http = require('http');
const socket = require('socket.io');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, "../public")))
const { getRoomUsers, userJoin, userLeaves, getCurrentUser } = require('../utils/users');
const { formatMessage } = require('../utils/message')
const server = http.createServer(app);

const io = socket(server);
const botName = "Chatly"
io.on('connection', (socket) => {

    //socket represents actual user 
    console.log("Connection establish")

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room);
        console.log(user.username);
        //welcome message

        socket.emit('message', formatMessage(botName, "Welcome to Chatly!"))

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has Joined the chat`))
        io.to(user.room).emit('roomUsers'), {
            room: user.room,
            users: getRoomUsers(user.room)
        }
    })
})

const port = 3000;


server.listen(port, () => {
    console.log(`Server is listen on Port ${port}`);
})