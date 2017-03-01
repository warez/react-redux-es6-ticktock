import {Constant, TTModel, move, setState, jumpToState, restart, setMyTeam} from './core.jsx'
import { createStore, applyMiddleware, compose } from 'redux';

function reducer(state = new TTModel(), action): TTModel {

    switch (action.type) {

        case Constant.SET_STATE:
            return setState(state, action.param);

        case Constant.GOTO_STATE:
            return jumpToState(state, action.param);

        case Constant.MOVE:
            return move(state, action.param.cellTitle, action.param.team, action.param.index);

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

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer,
        composeEnhancers(
            applyMiddleware( remoteActionMiddleware(socket) )
        )
    );
    return store;
}