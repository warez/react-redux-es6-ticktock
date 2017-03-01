'use strict';

import React from 'react';
import {isMyMove} from './ttflux'
import 'styles/ticktock.css';

export class History extends React.Component {

    render() {

        const history = this.props.history;
        const options = history.map((step, move) => {

            const codeDesc = move ? step.get("team") + ' at ' + step.get("moveAt") : '';
            const desc = move ? codeDesc : 'Game start';

            return (
                <option value={move} key={move + 1}>{desc}</option>
            );
        });

        return (<select onChange={this.props.onChange}>{options}</select>);

    }
}

export class Board extends React.Component {

    renderSquare(cellTitle, i) {

        const val = this.props.state.get(i);
        const winnerState = this.props.winnerState;
        const team = this.props.team;
        const isCellWinner =
            winnerState.get("winnerSymbol") &&
            winnerState.get("winnerSymbol") == val &&
            winnerState.get("winnerRow").includes(i);

        return <button title={cellTitle}
                       key={"square_" + i}
                       className={"square " + (isCellWinner ? 'winner' : '')}
                       onClick={() => this.props.move(cellTitle, team, i)}>

            {val}

        </button>
    }

    renderLegendCell(title) {
        return <div
            key={"legend_" + title}
            className="square legend">{title}</div>;
    }

    renderLegendRow() {

        const titles = ['','1','2','3'];
        let items = [];

        for(let i = 0; i < titles.length; i++) {
            items.push( this.renderLegendCell(titles[i]) );
        }

        return items;
    }

    renderRow(cellTitle, start) {

        let items = [];
        items.push( this.renderLegendCell( cellTitle ) );

        for(let i = start; i < start + 3; i++) {
            const label = cellTitle + '' + ( i + 1 - start);
            items.push( this.renderSquare( label , i) );
        }

        return items;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderLegendRow()}
                </div>
                <div className="board-row">
                    {this.renderRow("A", 0)}
                </div>
                <div className="board-row">
                    {this.renderRow("B", 3)}
                </div>
                <div className="board-row">
                    {this.renderRow("C", 6)}
                </div>
            </div>
        );
    }
}

export class TickTock extends React.Component {

    render() {

        const state = this.props.state;
        const history = state.get("history");
        const winnerState = state.get("winnerState");
        const winner = !!winnerState.get("winnerSymbol");
        const current = history.get(state.get("stepNumber"));

        const team = state.get("clientProp") ? state.get("clientProp").get("team") : 'wait..';
        let status, youAre = "You are: " + team + " in game " + state.get("id");

        if (winner) {

            status = ( winnerState.get("winnerSymbol") == team ) ? 'You win!!!! :D' : "You lose :(";
        } else {

            status = ( isMyMove(state) ) ? 'Make a move...' : 'Wait opponent...';
        }

        return ( <div className="game">
                <div className="game-board">

                    <Board
                        team={team}
                        state={current.get("squares")}
                        winnerState={winnerState}
                        move={this.props.move}
                    />

                </div>
                <div className="game-info">

                    <div className="status">
                        {youAre}
                    </div>
                    <div className="status">
                        {status} { winner && <button onClick={() => this.props.restart()}>Restart</button> }
                    </div>

                    <History onChange={event => this.props.goToState(event.target.value)} history={history}/>

                </div>
            </div>
        );
    }
}
