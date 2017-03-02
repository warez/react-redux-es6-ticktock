var Common = require("./../ticktock-common/index");
var Constant = Common.Constant;
var TTModel = Common.TTModel;

function goToStateAction(index) {
    return {
        type: Constant.GOTO_STATE,
        param: index
    };
}

function moveAction(cellTitle, team, id) {
    return{
        type: Constant.MOVE,
        param: {cellTitle: cellTitle, team: team, index: index}
    };
}

function restartAction() {
    return {
        type: Constant.RESTART,
        param: undefined
    };
}

function setStateAction(state) {
    return {
        type: Constant.SET_STATE,
        param: state
    };
}

let actions = {
    goToStateAction: goToStateAction,
    moveAction: moveAction,
    restartAction: restartAction,
    setStateAction:setStateAction
};

module.exports = actions;