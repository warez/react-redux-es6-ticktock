'use strict';
// imports node modules
const _ = require('lodash');
import {makeStore} from './store.js';

let gameArray = Array();

export class Game {

    constructor(id) {
        this._socketPlayer1 = undefined;
        this._socketPlayer2 = undefined;

        this.store = makeStore("GAME_ID_#" + id);

        this.store.subscribe(
            () => {
                const state = this.store.getState().toJS();

                if(this._socketPlayer1)
                    this._socketPlayer1.emit('state', state);

                if(this._socketPlayer2)
                    this._socketPlayer2.emit('state', state);
            }
        );
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
        const stateWithTeam = state.setIn(["clientProp","team"], team );

        this[position] = socket;

        socket.emit('state', stateWithTeam.toJS());
        socket.on('action', this.store.dispatch.bind(this.store));
        socket.on('disconnect', function(){
            me[position] = undefined;
        });
    }

    putIntoGame(socket) {

        if(this.getState() == "FULL")
            throw "This game is full";

        const team = this.getCurrentTeam();
        const position = (!this._socketPlayer1) ? "_socketPlayer1" : "_socketPlayer2";

        this.registerSocket(socket, position, team);
    }
}

function clean() {

    _.remove(gameArray, function(n:Game) {
        return n.getState() === "EMPTY";
    });
}

function searchGame() {

    let game = _.find(gameArray, function(n:Game) {
        return n.getState() === "WAIT_PLAYER";
    });

    return game;
}



export function newPlayer(socket) {

    clean();

    let game = searchGame();

    if(!game) {
        game = new Game(gameArray.length + 1000);
        gameArray.push(game);
    }

    game.putIntoGame(socket);
}