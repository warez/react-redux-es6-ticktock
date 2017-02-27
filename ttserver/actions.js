import {Constant, TTModel} from './core.jsx'

function goToStateAction(index:number) {
    return {
        meta: {remote: true},
        type: Constant.GOTO_STATE,
        param: index
    };
}

function moveAction(id:number) {
    return{
        meta: {remote: true},
        type: Constant.MOVE,
        param: id
    };
}

function restartAction() {
    return {
        meta: {remote: true},
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