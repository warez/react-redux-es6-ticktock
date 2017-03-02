'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {TTModel, /*actions ,*/ goToStateAction , restartAction, moveAction} from './ttflux'

import * as components from './ticktockflux-component.jsx';

function mapStateToProps(state : TTModel) {
    return {
        state: state
    }
}

const actions = function mapDispatchToProps(dispatch) {

    return {
        move: (title,team, index) => dispatch(moveAction(title, team, index)),
        goToState: (index) => dispatch(goToStateAction(index)),
        restart: () => dispatch(restartAction())
    };
};

export const TickTock = connect(

    mapStateToProps,
    actions

)(components.TickTock);

