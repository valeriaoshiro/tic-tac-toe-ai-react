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
            let updated = this.ttt.updateTurn(newBoard, newTurn);
            this.setState({
                turn: updated[0],
                board: updated[1],
                message: updated[2]
            }, () => {
                let compUpdated = this.ttt.compTurn(this.state.board);
                this.setState({
                    turn: compUpdated[0],
                    board: compUpdated[1],
                    message: compUpdated[2]
                })
            })
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({
            turn: this.ttt.turn,
            board: this.ttt.board,
            message: this.ttt.message
        });
    }

    clickDummy() {}

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