import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameLvl: '',
    }
  }

  newGame() {
    this.setState({
      gameLvl: '',
    })
  }

  render() {
      return (
        this.state.gameLvl === '' ? this.renderForm() : this.renderBoard()
      );
  }

  renderForm() {
    return (
      <div className="container">
        <div className="App">
          <h1>Sudoku</h1>
          <p>New game - choose difficulty:</p>
          <div className="FormButtons">
            <button onClick={() => this.setState({gameLvl: "easy"})}>Easy</button>
            <button onClick={() => this.setState({gameLvl: "medium"})}>Medium</button>
            <button onClick={() => this.setState({gameLvl: "hard"})}>Hard</button>
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
            gameLvl={this.state.gameLvl}
            newGame={this.newGame.bind(this)}
          />
        </div>     
      </div>
    );
  }
}

export default App;
