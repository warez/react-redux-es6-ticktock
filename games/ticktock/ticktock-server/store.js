let Core = require("./core");
let Common = require("./../ticktock-common/index");

let createStore = require("redux").createStore;
let Constant = Common.Constant;
let TTModel = Common.TTModel;

function reducer(state, action) {

    if(!state)
        state = new TTModel();

    if(!action || !action.type)
        return state;

    switch (action.type) {

        case Constant.SET_STATE:
            return Core.setStateAction(state, action.param);

        case Constant.GOTO_STATE:
            return Core.jumpToStateAction(state, action.param);

        case Constant.MOVE:
            return Core.moveAction(state, action.param.cellTitle, action.param.team, action.param.index);

        case Constant.RESTART:
            return Core.restartAction(state);

        default:
            return state;
    }

    return state;
}

function makeStore(id) {

    const state = new TTModel({id: id});

    const store = createStore(reducer, state);
    return store;
}

module.exports = {
    makeStore: makeStore
};