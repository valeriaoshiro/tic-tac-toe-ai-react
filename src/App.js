import React, { Component } from 'react';
import Square from './Square';
import Message from './Message';
import TTT from './TTT';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.ttt = new TTT();
        this.state = {
            turn: this.ttt.turn,
            board: this.ttt.board,
            message: this.ttt.message
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.clickDummy = this.clickDummy.bind(this);
    }

    handleClick(index) {
        if (this.state.board[index] !== 'X' && this.state.board[index] !== 'O') {
            // humanTurn(this.state.board, 'X');
            let newBoard = this.state.board.slice();
            let newTurn = 'X';
            newBoard[index] = newTurn;
            let updated = this.ttt.updateTurn(newBoard, newTurn);
            this.setState({
                turn: updated[0],
                board: updated[1],
                message: updated[2]
            }, this.compTurn) 
        }
    }

    

    clickDummy() {}

    compTurn() {
        let newBoard = this.state.board.slice();
        let newTurn = 'O';
        let spot = this.minimax(newBoard, newTurn).index;
        newBoard[spot] = newTurn;
        let updated = this.ttt.updateTurn(newBoard, newTurn);
            this.setState({
                turn: updated[0],
                board: updated[1],
                message: updated[2]
            }) 
    }

    minimax(newBoard, newTurn) {
        let availSpots = this.ttt.availableSpots(newBoard);
        if (this.ttt.winningComb(newBoard, 'X')) {
            return {
                score: -10
            };
        } else if (this.ttt.winningComb(newBoard, 'O')) {
            return {
                score: 10
            };
        } else if (availSpots.length === 0) {
            return {
                score: 0
            };
        }

        var moves = [];
        availSpots.forEach(spot => {
            var move = {};
            move.index = newBoard[spot];
            newBoard[spot] = newTurn;
            let g = newTurn === 'O' ? this.minimax(newBoard, 'X') : this.minimax(newBoard, 'O');
            move.score = g.score;
            newBoard[spot] = move.index;
            moves.push(move);
        });

        var bestMove;
        if (newTurn === 'O') {
            let bestScore = -10000;
            moves.forEach((move, i) => {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = i;
                }
            });
        } else {
            let bestScore = 10000;
            moves.forEach((move, i) => {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = i;
                }
            });
        }
        return moves[bestMove];
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({
            turn: this.ttt.turn,
            board: this.ttt.board,
            message: this.ttt.message
        });
    }

    render() {
        const squares = this.state.board.map((s, i) => {
            return <Square
                        value = { s }
                        index = { i }
                        onClick = { this.state.message === '' ? this.handleClick : this.clickDummy }
                        turn = { this.state.turn }
                        key = { i }
                    />
        })
        return ( 
            <div className = 'App'>
                <h1>Unbeatable Tic Tac Toe</h1> 
                <div className = 'board'>{ squares }</div> 
                <button className = 'button' onClick = { this.handleReset }>Reset</button> 
                <Message message = { this.state.message } /> 
            </div>
        );
    }
}

export default App;