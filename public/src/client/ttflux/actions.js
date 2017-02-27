import {Constant, TTModel} from './core.jsx'

export function goToStateAction(index:number) {
    return {
        meta: {remote: true},
        type: Constant.GOTO_STATE,
        param: index
    };
}

export function moveAction(title:string, index:number) {
    return{
        meta: {remote: true},
        type: Constant.MOVE,
        param: index
    };
}

export function restartAction() {
    return {
        meta: {remote: true},
        type: Constant.RESTART,
        param: undefined
    };
}

export function setStateAction(state:TTModel) {
    return {
        type: Constant.SET_STATE,
        param: state
    };
}

export function actions() {
    return {
        gotoState: goToStateAction,
        move: moveAction,
        restart: restartAction,
        setState: setStateAction
    }
};