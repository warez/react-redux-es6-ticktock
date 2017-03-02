var Immutable = require("immutable");
var List = Immutable.List;
var Record = Immutable.Record;

var exports = module.exports = {};

exports.TICKTOCK_GAME_NAME = "ticktock";

class Constant {
    static get GOTO_STATE() { return 'GOTO_STATE'; }
    static get RESTART() { return 'RESTART'; }
    static get MOVE() { return 'MOVE'; }
    static get SET_STATE() { return 'SET_STATE'; }
}
exports.Constant = Constant;

const WinnerStateRecord = Record({winnerSymbol:undefined,winnerRow:undefined});
class WinnerState extends WinnerStateRecord {

    constructor(props) {
        super(props);
    }
}
exports.WinnerState = WinnerState;

const HistoryModelRecord = Record({
    squares: List(new Array(9).fill(undefined)),
    moveAt: undefined,
    team: undefined
});

const ClientPropRecord = Record({team: undefined});

class HistoryModel extends HistoryModelRecord {

    constructor(props) {
        super(props);
    }

}
exports.HistoryModel = HistoryModel;

const TTModelRecord = Record({
    id: undefined,
    clientProp: new ClientPropRecord(),
    stepNumber: 0,
    xIsNext: true,
    winnerState: new WinnerStateRecord(),
    history: List( [new HistoryModel()] )
});

class TTModel extends TTModelRecord {

    constructor(props) {
        super(props);
    }

}
exports.TTModel = TTModel;

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

exports.calculateWinner = calculateWinner;