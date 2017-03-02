const Common = require("./../ticktock-common/index");
const TTModel = Common.TTModel;

const Immutable = require("immutable");
const List = Immutable.List;

const Core = {};

Core.restartAction = function (state) {
    return new TTModel({id:state.id});
};

Core.getType = function() {
    return Common.TICKTOCK_GAME_NAME;
};

Core.setStateAction = function (state, newState) {
    return state.merge(newState);
};

Core.moveAction = Common.moveAction;

module.exports = Core;