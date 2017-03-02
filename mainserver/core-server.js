'use strict';
// imports node modules
const _ = require('lodash');

import * as TickTockGame from "ticktock-server";

let games = [TickTockGame];
let roomArray = Array();

export class GameRoom {

    constructor(id: string, gameType, storeMaker) {

        this._socketPlayer1 = undefined;
        this._socketPlayer2 = undefined;
        this._gameType = gameType;

        this.store = storeMaker("GAME_ID_#" + id);

        this.store.subscribe(
            () => {

                const state = this.store.getState();

                if(this._socketPlayer1)
                    this._socketPlayer1.emit('state', addPerClientProp(state,'X', id).toJS());

                if(this._socketPlayer2)
                    this._socketPlayer2.emit('state', addPerClientProp(state,'O').toJS());
            }
        );
    }

    getType() {
        return this._gameType;
    }

    getState() {
        const state = this._socketPlayer1 && this._socketPlayer2 ? "FULL" :
            !this._socketPlayer1 && !this._socketPlayer2 ? "EMPTY" : "WAIT_PLAYER";

        return state;
    }

    getCurrentTeam() {
        const team = this._socketPlayer1 && this._socketPlayer2 ? undefined :
            !this._socketPlayer1 && !this._socketPlayer2 ? "X" :
                !this._socketPlayer1 ? "X" : 'O';

        return team;
    }

    registerSocket(socket, position, team) {
        const me = this;
        const state = this.store.getState();
        const stateWithTeam = addPerClientProp(state, team);

        this[position] = socket;

        socket.emit('state', stateWithTeam.toJS());
        socket.on('action', this.store.dispatch.bind(this.store));
        socket.on('disconnect', function(){
            me[position] = undefined;
        });
    }

    addPlayer(socket) {

        if(this.getState() == "FULL")
            throw "This game is full";

        const team = this.getCurrentTeam();
        const position = (!this._socketPlayer1) ? "_socketPlayer1" : "_socketPlayer2";

        this.registerSocket(socket, position, team);
    }
}

function addPerClientProp(state, team) {
    return state.setIn(["clientProp","team"], team );
}

function deleteEmptyRoom() {

    _.remove(roomArray, function(n:GameRoom) {
        return n.getState() === "EMPTY";
    });
}

function searchFreeRoom(gameType: string) {

    let game = _.find(roomArray, function(n:GameRoom) {
        return n.getState() === "WAIT_PLAYER" &&
            n.getType() === gameType;
    });

    return game;
}

function searchGame(gameType: string) {

    let game = _.find(games, function(game) {
        return game.getType() === gameType;
    });

    return game;
}

function getRequiredType(socket) {
    const type = socket.handshake.query.gameType;
    return type;
}


export function newPlayer(socket) {

    const requiredGameType = getRequiredType(socket);
    let game = searchGame(requiredGameType);
    if(!game) {
        socket.emit("{error: 'no game found'}");
        return;
    }

    let room = searchFreeRoom(requiredGameType);

    if(!room) {
        room = new GameRoom(roomArray.length + 1000, game.getType(), game.makeStore);
        roomArray.push(room);
    }

    room.addPlayer(socket);

    deleteEmptyRoom();
}