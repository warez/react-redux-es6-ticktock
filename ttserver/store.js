import {Constant, TTModel, moveAction, jumpToStateAction, restartAction, setStateAction} from './core.js'
import { createStore, applyMiddleware, compose} from 'redux';

function reducer(state = new TTModel(), action): TTModel {

    switch (action.type) {

        case Constant.SET_STATE:
            return setStateAction(state, action.param);

        case Constant.GOTO_STATE:
            return jumpToStateAction(state, action.param);

        case Constant.MOVE:
            return moveAction(state, action.param);

        case Constant.RESTART:
            return restartAction(state);

        default:
            return state;
    }

    return state;
}

export function makeStore() {

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        //applyMiddleware(...middleware),
        // other store enhancers if any
    );
    const store = createStore(reducer, enhancer);
    return store;
}