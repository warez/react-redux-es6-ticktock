import {List, Record} from 'immutable';

export class Constant {
    static get GOTO_STATE() { return 'GOTO_STATE'; }
    static get RESTART() { return 'RESTART'; }
    static get MOVE() { return 'MOVE'; }
    static get SET_STATE() { return 'SET_STATE'; }
}

const WinnerStateRecord = Record({winnerSymbol:undefined,winnerRow:undefined});
export class WinnerState extends WinnerStateRecord {

    constructor(props) {
        super(props);
    }
}

const HistoryModelRecord = Record({
    squares: List(new Array(9).fill(undefined))
});
export class HistoryModel extends HistoryModelRecord {

    constructor(props) {
        super(props);
    }

}

const TTModelRecord = Record({
    stepNumber: 0,
    xIsNext: true,
    winnerState: new WinnerStateRecord(),
    history: List( [new HistoryModel()] )
});

export class TTModel extends TTModelRecord {

    constructor(props) {
        super(props);
    }

}

export function restart(state:TTModel) {
    return new TTModel();
}

export function jumpToState(state:TTModel, step: number) {
    const stepNumber = parseInt(step);
    const history = state.get("history")
    const current = history.get(step);
    const squares = current.get("squares");

    const winnerState = calculateWinner(squares);

    return new TTModel( {
        stepNumber: stepNumber,
        xIsNext: (!(step % 2)),
        winnerState: winnerState,
        history: List(state.get("history").slice(0,stepNumber + 1)),
    });
}

export function setState(state:TTModel, newState:TTModel) {
    return state.merge(newState);
}

export function move(state:TTModel, i: number) {

    if(state.getIn("winnerState.winnerSymbol"))
        return state;

    const history = state.get("history");
    var current = history.get(history.size - 1 );

    const squares = current.get("squares").set(i, state.get("xIsNext") ? 'X' : 'O');
    const winnerState = calculateWinner(squares);
    const newHistoryItem = new HistoryModel({ squares: squares});
    const newHistory = List(state.get("history")).push(newHistoryItem);

    const model = new TTModel( {
        stepNumber: state.get("stepNumber") + 1,
        xIsNext: !state.get("xIsNext"),
        winnerState: winnerState,
        history: newHistory
    });

    return model;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares.get(a) && squares.get(a) === squares.get(b) && squares.get(a) === squares.get(c)) {
            return new WinnerState( {winnerSymbol: squares.get(a), winnerRow: List(lines[i]) }) ;
        }
    }
    return new WinnerState();
}