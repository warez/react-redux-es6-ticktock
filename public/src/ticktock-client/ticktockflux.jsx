'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {makeStore} from './ttflux';

import {Provider} from 'react-redux'
import {TickTock} from './ticktockflux-container.jsx'

import {Map, List, Record, fromJS} from 'immutable';

import io from 'socket.io-client';

import {setStateAction} from './ttflux'

var opts = {
    query: {
        'gameType': 'ticktock',
    }
};

const socket = io(`${location.protocol}//${location.hostname}:8090`, opts);

export const store = makeStore(socket);

socket.on('state', state => {
        const _state =  fromJS(state);
        store.dispatch(setStateAction(_state));
    }
);

import 'styles/ticktock.css';

ReactDOM.render( <Provider store={store}><TickTock/></Provider> , document.getElementById('ticktock') );
