import {List, Record} from 'immutable';
import { calculateWinner, HistoryModel, TTModel} from 'ticktock-common'

export function restart(state:TTModel) {
    return new TTModel({clientProp: state.get("clientProp")});
}

export function jumpToState(state:TTModel, step: number) {
    const stepNumber = parseInt(step);
    const history = state.get("history")
    const current = history.get(step);
    const squares = current.get("squares");

    const winnerState = calculateWinner(squares);

    return new TTModel( {
        id: state.get("id"),
        stepNumber: stepNumber,
        xIsNext: (!(step % 2)),
        winnerState: winnerState,
        history: List(state.get("history").slice(0,stepNumber + 1)),
    });
}

export function setState(state:TTModel, newState:TTModel) {

    const mergedState = state.mergeDeep(newState);
    return mergedState;
}

export function move(state:TTModel, celltitle: string, team:string, i: number) {

    if(state.get("winnerState").get("winnerSymbol"))
        return state;

    if(!isMyMove(state))
        return state;

    const history = state.get("history");

    const squares = history.get(history.size - 1 ).get("squares").set(i, team);
    const winnerState = calculateWinner(squares);
    const newHistoryItem = new HistoryModel({team: team, moveAt: celltitle, squares: squares});
    const newHistory = List(state.get("history")).push(newHistoryItem);

    const model = new TTModel( {
        id: state.get("id"),
        clientProp: state.get("clientProp"),
        stepNumber: state.get("stepNumber") + 1,
        xIsNext: !state.get("xIsNext"),
        winnerState: winnerState,
        history: newHistory
    });

    return model;
}

export function isMyMove(state: Record) {

    const team = state.get("clientProp").get("team");

    return (state.get("xIsNext") &&  team == 'X') ||
        ( !state.get("xIsNext") &&  team == 'O');
}