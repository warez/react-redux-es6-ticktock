import {Constant, TTModel, move, setState, jumpToState, restart} from './core.jsx'
import { createStore, applyMiddleware, compose } from 'redux';

function reducer(state = new TTModel(), action): TTModel {

    switch (action.type) {

        case Constant.SET_STATE:
            return setState(state, action.param);

        case Constant.GOTO_STATE:
            return jumpToState(state, action.param);

        case Constant.MOVE:
            return move(state, action.param);

        case Constant.RESTART:
            return restart(state);

        default:
            return state;
    }

    return state;
}


const remoteActionMiddleware = socket => store => next => action => {

    //per evitare un loop infinito tra client e server al set_state
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }

    return next(action);
};

export function makeStore(socket) {


    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        /*applyMiddleware(
            remoteActionMiddleware(socket)
        )*/
    );
    const store = createStore(reducer, enhancer);
    return store;
}