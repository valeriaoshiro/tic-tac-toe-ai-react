import React, { Component } from 'react';
import Square from './Square';
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
    const message = '';
    this.setState({turn, board, message});
  }

  render() {
    const squares = this.state.board.map((s, i) => {
      return <Square 
              value={s}
              index={i}
              onClick={this.handleClick}
              turn={this.state.turn}
              key={i}
            />
    })
    return (
      <div className="App">
        <h1>Unbetable Tic Tac Toe</h1>
        <div className="board">
          {squares}
        </div>
        {/*<ResetButton />
        <Message />*/}
        <br/><button onClick={this.handleReset}>Reset</button>
        <h2></h2>
      </div>
    );
  }
}

export default App;
