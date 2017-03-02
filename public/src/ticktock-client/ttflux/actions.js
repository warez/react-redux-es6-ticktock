import {Constant, TTModel} from 'ticktock-common'

export function moveAction(cellTitle:string, team: string, index:number) {
    return{
        meta: {remote: true},
        type: Constant.MOVE,
        param: {cellTitle: cellTitle, team: team, index: index}
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
        move: moveAction,
        restart: restartAction,
        setState: setStateAction
    }
};