import {Constant, TTModel, moveAction, jumpToStateAction, restartAction, setStateAction} from './core.js'
import { createStore, applyMiddleware, compose} from 'redux';

function reducer(state = new TTModel(), action): TTModel {

    if(!action || !action.type)
        return state;

    switch (action.type) {

        case Constant.SET_STATE:
            return setStateAction(state, action.param);

        case Constant.GOTO_STATE:
            return jumpToStateAction(state, action.param);

        case Constant.MOVE:
            return moveAction(state, action.param.cellTitle, action.param.team, action.param.index);

        case Constant.RESTART:
            return restartAction(state);

        default:
            return state;
    }

    return state;
}

export function makeStore(id) {

    const enhancer = compose(
        //applyMiddleware(...middleware),
        // other store enhancers if any
    );

    const state = new TTModel({id: id});

    const store = createStore(reducer, state, enhancer);
    return store;
}