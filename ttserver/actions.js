import {Constant, TTModel} from './core.jsx'

function goToStateAction(index:number) {
    return {
        type: Constant.GOTO_STATE,
        param: index
    };
}

function moveAction(id:number) {
    return{
        type: Constant.MOVE,
        param: id
    };
}

function restartAction() {
    return {
        type: Constant.RESTART,
        param: undefined
    };
}

function setStateAction(state:TTModel) {
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

export default actions;