
import Server from 'socket.io';
import {makeStore} from './store.js';

let currentTeam = 'X';

function getCurrentTeam() {
    if(currentTeam == 'X') {
        currentTeam = 'O';
        return 'X';
    }

    if(currentTeam == 'O') {
        currentTeam = 'X';
        return 'O';
    }

    return 'O';
}

function startServer() {

    const store = makeStore();

    const io = new Server().attach(8090);

    store.subscribe(
        () => {
            const stateWithoutClientProps = store.getState().delete("clientProp");
            io.emit('state', stateWithoutClientProps.toJS())
        }
    );

    io.on('connection', (socket) => {

        const state = store.getState();
        const stateWithTeam = state.setIn(["clientProp","team"], getCurrentTeam() );

        socket.emit('state', stateWithTeam.toJS());
        socket.on('action', store.dispatch.bind(store));
    });

}

startServer();