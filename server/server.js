const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const uuid = require('uuid');

// Definer app som vores express backend.
const app = express();

// Definer vores offentlige route for express.
// Dette er hvad der vil være offentligt for folk på nettet.
app.use(express.static(`${__dirname}/../client`));

// Setup vores http server og Socket io.
const server = http.createServer(app);
const io = socketio(server);

// Users og Connections bruges til at opbevare forbindelserne & Navnene til serveren.
let users = [];
let connections = [];

// Function der udløses når en bruger joiner serveren.
io.on('connection', (socket) => {
    
    // Function for at opdatere vores usernames, så de kan blive vist på siden.
    const updateUsernames = () => {
        io.sockets.emit('get users', users)
    };

    // Når en bruger joiner serveren, så push forbindelsen til connections.
    // Set brugerens navn midlertidigt til "Anonymous".
    // Opdater de viste navne på siden.
    connections.push(socket);
    socket.username = 'Anonymous';
    updateUsernames();

    // Når en bruger angiver deres Username.
    // Giv det et unikt-ID. Skub brugerens navn til data.nickName så vi kan hive det senere henne.
    // Push det unikke-ID og username til users.
    // Opdater vores viste navne.
    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.nickName;
        users.push({id, username: socket.username});
        updateUsernames();
    });

    // Når en bruger sender en besked i chat vinduet, så send det til alle forbundne brugere, sammen med deres username.
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username: socket.username});
    });

    // Når en bruger beegynder at skrive i chatten, så hvis det for resten af brugerne.
    socket.on('typing', data => {
        socket.broadcast.emit('typing', {username: socket.username});
    });

    // Når en bruger forlader siden.
    // Er der intet username så returner.
    // Findes der et username, så set det username til "undefined" og find den respektive bruger i vores users array.
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
        
        // Filtrer users og fjern user. 
        users = users.filter(x => x !== user);

        // Opdater viste navne.
        // Splice brugeren fra connections array.
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
    })

});

// I tilfælde af en server error. Hvis den i server konsol.
server.on('error', (err) => {
    console.error(err);
});

// Server lytter til adressen: localhost:8000.
// konsol logger at serveren er klar.
server.listen(8000, () => {
    console.log('Server is ready');
});
