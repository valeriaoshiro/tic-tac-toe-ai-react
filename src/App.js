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
            let newBoard = this.state.board.slice();
            let newTurn = 'X';
            newBoard[index] = newTurn;
            this.updateTurn(newBoard, newTurn);
        }
    }

    updateTurn(newBoard, newTurn) {
        if (this.winningComb(newBoard, newTurn)) {
            this.setState({
                turn: newTurn,
                board: newBoard,
                message: newTurn === 'O' ? 'You lost' : 'You won'
            });
        } else if (!this.winningComb(newBoard, newTurn) && this.availableSpots(newBoard).length === 0) {
            this.setState({
                turn: newTurn,
                board: newBoard,
                message: 'It\'s a tie'
            })
        } else {
            newTurn === 'O' ? 
                this.setState({
                    board: newBoard,
                    turn: 'X'
                }) 
                : this.setState({
                    board: newBoard,
                    turn: 'O'
                }, this.compTurn);
        }
    }

    clickDummy() {}

    winningComb(newBoard, newTurn) {
        return (
            this.horizontalTop(newBoard, newTurn) ||
            this.horizontalMiddle(newBoard, newTurn) ||
            this.horizontalBottom(newBoard, newTurn) ||
            this.verticalLeft(newBoard, newTurn) ||
            this.verticalMiddle(newBoard, newTurn) ||
            this.verticalRight(newBoard, newTurn) ||
            this.diagonal1(newBoard, newTurn) ||
            this.diagonal2(newBoard, newTurn)) ? true : false;
    }

    horizontalTop(newBoard, newTurn) {
        return newBoard[0] === newBoard[1] && newBoard[0] === newBoard[2] && newBoard[0] === newTurn ? true : false;
    }

    horizontalMiddle(newBoard, newTurn) {
        return newBoard[3] === newBoard[4] && newBoard[3] === newBoard[5] && newBoard[3] === newTurn ? true : false;
    }

    horizontalBottom(newBoard, newTurn) {
        return newBoard[6] === newBoard[7] && newBoard[6] === newBoard[8] && newBoard[6] === newTurn ? true : false;
    }

    verticalLeft(newBoard, newTurn) {
        return newBoard[0] === newBoard[3] && newBoard[0] === newBoard[6] && newBoard[0] === newTurn ? true : false;
    }

    verticalMiddle(newBoard, newTurn) {
        return newBoard[1] === newBoard[4] && newBoard[1] === newBoard[7] && newBoard[1] === newTurn ? true : false;
    }

    verticalRight(newBoard, newTurn) {
        return newBoard[2] === newBoard[5] && newBoard[2] === newBoard[8] && newBoard[2] === newTurn ? true : false;
    }

    diagonal1(newBoard, newTurn) {
        return newBoard[0] === newBoard[4] && newBoard[0] === newBoard[8] && newBoard[0] === newTurn ? true : false;
    }

    diagonal2(newBoard, newTurn) {
        return newBoard[2] === newBoard[4] && newBoard[2] === newBoard[6] && newBoard[2] === newTurn ? true : false;
    }

    availableSpots(newBoard) {
        return newBoard.filter(i => i !== 'X' && i !== 'O');
    }

    compTurn() {
        let newBoard = this.state.board.slice();
        let newTurn = 'O';
        let spot = this.minimax(newBoard, newTurn).index;
        newBoard[spot] = newTurn;
        this.updateTurn(newBoard, newTurn);
    }

    minimax(newBoard, newTurn) {
        let availSpots = this.availableSpots(newBoard);
        if (this.winningComb(newBoard, 'X')) {
            return {
                score: -10
            };
        } else if (this.winningComb(newBoard, 'O')) {
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
        const turn = 'X';
        const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const message = '';
        this.setState({
            turn,
            board,
            message
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