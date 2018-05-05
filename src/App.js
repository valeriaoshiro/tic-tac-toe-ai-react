import React, { Component } from 'react';
import logo from './logo.svg';
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
  }
  handleClick(e){
    e.preventDefault();
  }
  handleReset(e){
    e.preventDefault();
    const turn = 'X';
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const message: ''
    this.setState({turn, board, message});
  }

  render() {
    const squares = this.state.board.map((s, i) => {
      <Square id={i} key={i} onClick={this.handleClick}/>
    })
    return (
      <div className="App">
        <h1>Unbetable Tic Tac Toe</h1>
        {squares}
        <ResetButton />
        <Message />
        <button onClick={this.handleReset}>Reset</button>
        <h2></h2>
      </div>
    );
  }
}

export default App;
