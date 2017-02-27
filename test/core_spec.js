import {expect} from 'chai';
import {List, Map, Record} from 'immutable';
import {TTModel, HistoryModel, WinnerState, doMossa, jumpToState, restart} from '../public/src/client/ttflux/core.jsx'

describe('Core test', () => {

    describe('do winner move', () => {

        it('change state to win!', () => {

            let state = new TTModel( {
                history : List( [
                    new HistoryModel({ squares: List(['X','O','O',,'X',,,,]) })
                ])
            });

            let nextState = doMossa(state, 8);

            expect(nextState).to.equal(new TTModel( {
                stepNumber: 1,
                xIsNext: false,
                winnerState: new WinnerState({"winnerSymbol": 'X', "winnerRow": List([0,4,8]) }),
                history: List (
                    [
                        new HistoryModel({ squares: List(['X','O','O',,'X',,,,]) }),
                        new HistoryModel({squares: List(['X','O','O',,'X',,,,'X']) })
                    ]
                )
            }));

            expect(state).to.equal(new TTModel( {
                stepNumber: 0,
                xIsNext: true,
                winner: false,
                history: List( [
                    new HistoryModel( { squares: List(['X','O','O',,'X',,,,]) } )
                ])
            }));
        });

    });

    describe('restart game', () => {

        it('has initial state', () => {

            let nextState = new TTModel();

            let move = [0,5,4,8,7,2];
            for(let i = 0; i < 6; i++)
                nextState = doMossa(nextState, move[i]);

            nextState = restart(nextState);
            expect(nextState).to.equal(new TTModel());
        });

    });

    describe('jumptostate to first', () => {

        it('restart game', () => {

            let nextState = new TTModel();

            let move = [0,5,4,8,7,2];
            for(let i = 0; i < 6; i++)
                nextState = doMossa(nextState, move[i]);

            expect(nextState).to.equal(new TTModel( {
                stepNumber: 6,
                xIsNext: true,
                winnerState: new WinnerState({"winnerSymbol": 'O', "winnerRow": List([2,5,8]) }),
                history: List (
                    [
                        new HistoryModel({ squares: List([,,,,,,,,,]) }),
                        new HistoryModel({ squares: List(['X',,,,,,,,,]) }),
                        new HistoryModel({ squares: List(['X',,,,,'O',,,,]) }),
                        new HistoryModel({ squares: List(['X',,,,'X','O',,,,]) }),
                        new HistoryModel({ squares: List(['X',,,,'X','O',,,'O',]) }),
                        new HistoryModel({ squares: List(['X',,,,'X','O',,'X','O',]) }),
                        new HistoryModel({ squares: List(['X',,'O',,'X','O',,'X','O',]) })
                    ]
                )
            }));

            nextState = jumpToState(nextState, 0);

            expect(nextState).to.equal(new TTModel());

        });

    });

});