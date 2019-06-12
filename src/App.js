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
        <div className="App">
          <h1>Sudoku</h1>
          {this.state.gameLvl === '' ? this.renderForm() : this.renderBoard()}
        </div>
      );
  }

  renderForm() {
    return (
      <div className="FormButtons">
        <p>New game - choose difficulty:</p>
        <button onClick={() => this.setState({gameLvl: "easy"})}>Easy</button>
        <button onClick={() => this.setState({gameLvl: "medium"})}>Medium</button>
        <button onClick={() => this.setState({gameLvl: "hard"})}>Hard</button>
      </div>
    );
  }

  renderBoard() {
    return (
      <Board
        gameLvl={this.state.gameLvl}
        newGame={this.newGame.bind(this)}
      />
    );
  }
}

export default App;
