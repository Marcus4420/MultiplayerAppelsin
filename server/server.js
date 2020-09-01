const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const uuid = require('uuid');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

let users = [];
let connections = [];

io.on('connection', (socket) => {

    const updateUsernames = () => {
        io.sockets.emit('get users', users)
    };

    connections.push(socket);
    socket.username = 'Anonymous';
    updateUsernames();

    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.nickName;
        users.push({id, username: socket.username});
        updateUsernames();
    });

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username: socket.username});
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', {username: socket.username});
    });

    socket.on('disconnect', data => {
        if (!socket.username)
            return;

        let user = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                user = users[i];
                break;
            }
        }

        users = users.filter(x => x !== user);

        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
    })

});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8000, () => {
    console.log('Server is ready');
});