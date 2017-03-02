import {List, Record} from 'immutable';
import { calculateWinner, HistoryModel, TTModel, moveAction} from 'ticktock-common'

export function restart(state:TTModel) {
    return new TTModel({clientProp: state.get("clientProp")});
}

export function setState(state:TTModel, newState:TTModel) {

    const mergedState = state.merge(newState);
    return mergedState;
}

export function move(state:TTModel, celltitle: string, team:string, i: number) {

    const newState = moveAction(state, celltitle, team, i);

    const newStateWithClientProp =  newState.set("clientProp", state.get("clientProp"));

    return newStateWithClientProp;
}

export function isMyMove(state: Record) {

    const team = state.get("clientProp").get("team");

    if(state.get("xIsNext") &&  team == 'X')
        return true;
    if( !state.get("xIsNext") &&  team == 'O')
        return true;

    return false;
}