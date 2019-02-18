import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import sudoku from 'sudoku-umd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
    }
  }

  newGame(lvl) {
    const generatedBoard = sudoku.generate(lvl);
    this.setState({
      initialBoard: generatedBoard,
      board: generatedBoard,
    })
  }

  restartGame() {
    const initialBoard = this.state.initialBoard;
    this.setState({
      board: initialBoard
    })
  }

  solve() {
    const board = sudoku.solve(this.state.initialBoard);
    this.setState({board});
  }

  render() {
      return (
        this.state.initialBoard !== '' ? this.renderBoard() : this.renderForm()
      );
  }

  renderForm() {
    return (
      <div className="container">
        <div className="App">
          <h1>Sudoku</h1>
          <p>New game - choose difficulty:</p>
          <div className="FormButtons">
            <button onClick={() => this.newGame("easy")}>Easy</button>
            <button onClick={() => this.newGame("medium")}>Medium</button>
            <button onClick={() => this.newGame("hard")}>Hard</button>
          </div>
        </div>
      </div>
    );
  }

  renderBoard() {
    return (
      <div className="container">
        <div className="App">
          <h1>Sudoku</h1>
          <Board 
            initialBoard={this.state.initialBoard}/>
          <div className="Buttons">
            <button onClick={() => this.setState({initialBoard: '', board: ''})}>New Game</button>
            <button onClick={() => this.solve()}>Solve</button>
            <button onClick={() => this.restartGame()}>Restart</button>
          </div>
        </div>     
      </div>
    );
  }
}

export default App;
