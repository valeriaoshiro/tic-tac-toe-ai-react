import React, { Component } from 'react';
import Square from './Square';
import Message from './Message';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      turn: 'X',
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      message: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
		this.clickDummy = this.clickDummy.bind(this);
  }

  handleClick(index){
    if(this.state.board[index] !== 'X' && this.state.board[index] !== 'O'){
      let newBoard = this.state.board.slice();
      let newTurn = 'X';
      newBoard[index] = newTurn;

      if(!this.winningComb(newBoard, newTurn) && this.availableSpots(newBoard).length === 0){
        this.setState({turn: newTurn, board: newBoard, message: "It's a tie"})
      } else if(this.winningComb(newBoard, newTurn)) {
        this.setState({turn: newTurn, board: newBoard, message: 'You won'});
      } else {
        this.setState({board: newBoard, turn: "O"}, this.compTurn);
      }
    }
  }

	clickDummy(){}

  winningComb(newBoard, newTurn){
		if(newBoard[0] === newBoard[1] && newBoard[0] === newBoard[2] && newBoard[0] === newTurn ||
		   newBoard[3] === newBoard[4] && newBoard[3] === newBoard[5] && newBoard[3] === newTurn ||
		   newBoard[6] === newBoard[7] && newBoard[6] === newBoard[8] && newBoard[6] === newTurn || 
		   newBoard[0] === newBoard[3] && newBoard[0] === newBoard[6] && newBoard[0] === newTurn ||
		   newBoard[1] === newBoard[4] && newBoard[1] === newBoard[7] && newBoard[1] === newTurn ||
		   newBoard[2] === newBoard[5] && newBoard[2] === newBoard[8] && newBoard[2] === newTurn ||
		   newBoard[0] === newBoard[4] && newBoard[0] === newBoard[8] && newBoard[0] === newTurn ||
		   newBoard[2] === newBoard[4] && newBoard[2] === newBoard[6] && newBoard[2] === newTurn){
			return true;
		} else {
			return false;
		}
	}

  availableSpots(newBoard){
		return newBoard.filter(i => i != 'X' && i != 'O');
	}

  compTurn(){
    let newBoard = this.state.board.slice();
    let newTurn = 'O';
		let spot = this.minimax(newBoard, newTurn).index;
		setTimeout(()=>{
      newBoard[spot] = newTurn;
			this.setState({board: newBoard});
			if(!this.winningComb(newBoard, newTurn) && this.availableSpots(newBoard).length === 0){
        this.setState({turn: newTurn, board: newBoard, message: "It's a tie"})
      } else if(this.winningComb(newBoard, newTurn)) {
        this.setState({turn: newTurn, board: newBoard, message: 'You lost'});
      } else {
        this.setState({board: newBoard, turn: "X"})
      }
		}, 500);
	}

  minimax(newBoard, newTurn){	
   		let availSpots = this.availableSpots(newBoard);
  		if (this.winningComb(newBoard, 'X')) {
    		return {score: -10};
  		} else if (this.winningComb(newBoard, 'O')) {
    		return {score: 10};
  		} else if (availSpots.length === 0) {
    		return {score: 0};
  		}

  		var moves = [];
  		availSpots.forEach(spot => {
  			var move = {};
    		move.index = newBoard[spot];
    		newBoard[spot] = newTurn; 

    		if(newTurn == 'O'){
    			var g = this.minimax(newBoard, 'X');
      			move.score = g.score;
    		} else {
    			var g = this.minimax(newBoard, 'O');
      			move.score = g.score;
    		}
    		newBoard[spot] = move.index;
    		moves.push(move);
  		});

  		var bestMove;
  		if (newTurn == 'O') {
    		var bestScore = -10000;
    		moves.forEach((move, i) => {
    			if (move.score > bestScore) {
        			bestScore = move.score;
        			bestMove = i;
      			}
    		});
  		} else {
    		var bestScore = 10000;
    		moves.forEach((move, i) => {
    			if (move.score < bestScore) {
        			bestScore = move.score;
        			bestMove = i;
      			}
    		});
  		}
  		return moves[bestMove];
	}	

  handleReset(e){
    e.preventDefault();
    const turn = 'X';
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const message = '';
    this.setState({turn, board, message});
  }

  render() {
    const squares = this.state.board.map((s, i) => {
      return <Square 
              value={s}
              index={i}
              onClick={this.state.message == '' ? this.handleClick : this.clickDummy}
              turn={this.state.turn}
              key={i}
            />
    })
    return (
      <div className="App">
        <h1>Unbeatable Tic Tac Toe</h1>
        <div className="board">
          {squares}
        </div>
        <button className="button" onClick={this.handleReset}>Reset</button>
        <Message 
          message={this.state.message}
        />
      </div>
    );
  }
}

export default App;
