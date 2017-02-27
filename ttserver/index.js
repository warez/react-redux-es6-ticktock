
import Server from 'socket.io';
import {makeStore} from './store.js';

function startServer() {

    const store = makeStore();

    const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {

        const state = store.getState();

        socket.emit('state', state.toJS());
        socket.on('action', store.dispatch.bind(store));
    });

}

startServer();