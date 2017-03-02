var Common = require("./../ticktock-common/index");
var TTModel = Common.TTModel;
var calculateWinner = Common.calculateWinner;
var HistoryModel = Common.HistoryModel;

var Immutable = require("immutable");
var List = Immutable.List;

var Core = {};

Core.restartAction = function (state) {
    return new TTModel();
};

Core.getType = function() {
    return Common.TICKTOCK_GAME_NAME;
};

Core.jumpToStateAction = function (state, step) {
    const stepNumber = parseInt(step);
    const history = state.get("history");
    const current = history.get(step);
    const squares = current.get("squares");

    const winnerState = calculateWinner(squares);

    return new TTModel({
        id: state.get("id"),
        stepNumber: stepNumber,
        xIsNext: (!(step % 2)),
        winnerState: winnerState,
        history: List(state.get("history").slice(0, stepNumber + 1)),
    });
};

Core.setStateAction = function (state, newState) {
    return state.merge(newState);
};

Core.moveAction = function (state, cellTitle, team, i) {

    if (state.get("winnerState").get("winnerSymbol"))
        return state;

    const history = state.get("history");

    const squares = history.get(history.size - 1).get("squares").set(i, team);
    const winnerState = calculateWinner(squares);
    const newHistoryItem = new HistoryModel({team: team, moveAt: cellTitle, squares: squares});
    const newHistory = List(state.get("history")).push(newHistoryItem);

    const model = new TTModel({
        id: state.get("id"),
        stepNumber: state.get("stepNumber") + 1,
        xIsNext: !state.get("xIsNext"),
        winnerState: winnerState,
        history: newHistory
    });

    return model;
};

module.exports = Core;