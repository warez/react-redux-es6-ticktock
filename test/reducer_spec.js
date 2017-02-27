import {expect} from 'chai';
import {List, Map, Record} from 'immutable';
import {TTModel, ActionModel, Constant} from '../public/src/client/ttflux/core.jsx'
import {makeStore} from '../public/src/client/ttflux/store.jsx'

describe('Core reducer function', () => {

    it('can be used with redux', () => {
        const actions = [
            {type:Constant.MOSSA, param: 0},
            {type:Constant.MOSSA, param: 1},
            {type:Constant.MOSSA, param: 3},
            {type:Constant.MOSSA, param: 5},
            {type:Constant.MOSSA, param: 6}
        ];

        const store = makeStore();

        for(let i = 0; i < actions.length; i++)
            store.dispatch(actions[i]);

        let state = store.getState();

        expect(state).to.have.deep.property('winnerState.winnerSymbol', 'X');
    });
});