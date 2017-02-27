'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

import 'styles/ticktock.css';

function Square(props) {
    return (
        <button title={props.title}
                className={"square " + (props.isWinner ? 'winner' : '')}
                onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

export class History extends React.Component {

    render() {

        const history = this.props.history;
        const options = history.map((step, move) => {

            const sign = (move % 2) ? 'X' : 'O';
            const codeDesc = move ? sign + ' at ' + step.code : '';
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

        const isWinner = this.props.winnerRow &&
                this.props.winnerRow.indexOf(i) != -1;

        return <Square title={cellTitle}
                       isWinner={isWinner}
                       value={this.props.squares[i]}
                       onClick={() => this.props.onClick(cellTitle, i)} />;
    }

    renderLegendCell(title) {
        return <div className="square legend">{title}</div>;
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

    constructor() {
        super();
        this.state = this.getInitModel();
        this.handleChange = this.handleChange.bind(this);
    }

    getInitModel() {
        return {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    restart() {
        var state = this.getInitModel();
        this.setState(state);
    }

    handleChange(event) {
        this.jumpTo(event.target.value);
        //event.preventDefault();
    }

    handleClick(cellTitle, i) {

        const history = this.state.history;
        const current = history[history.length - 1 ];
        const squares = current.squares.slice();

        var [winner, winnerRow] = calculateWinner(squares) || squares[i];

        if (winner) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({

            history: history.concat([{
                squares: squares,
                code: cellTitle
            }]),

            stepNumber: this.state.stepNumber + 1,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {

        const stepNumber = parseInt(step);

        this.setState({
            stepNumber: stepNumber,
            xIsNext: (stepNumber % 2) ? false : true,
            history: this.state.history.slice(0,stepNumber + 1)
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber || history.length - 1];
        const [winner, winnerRow] = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerRow={winnerRow}
                        onClick={(cellTitle, i) => this.handleClick(cellTitle, i)}
                    />
                </div>
                <div className="game-info">

                    <div className="status">
                        {status} { winner && <button onClick={() => this.restart()}>Restart</button> }
                    </div>

                    <History onChange={this.handleChange} history={history}/>

                </div>
            </div>
        );
    }
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [ squares[a], lines[i] ];
        }
    }
    return [null, null];
}

ReactDOM.render( <TickTock/> , document.getElementById('ticktock') );
