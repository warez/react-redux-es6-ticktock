const Common = require("./../ticktock-common/index");
const Constant = Common.Constant;

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
    moveAction: moveAction,
    restartAction: restartAction,
    setStateAction:setStateAction
};

module.exports = actions;