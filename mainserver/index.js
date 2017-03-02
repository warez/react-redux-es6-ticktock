
import Server from 'socket.io';
import {newPlayer} from './core-server';

function startServer() {

    const io = new Server().attach(8090);

    io.on('connection', (socket) => {

        newPlayer(socket);
    });

}

startServer();