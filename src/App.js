import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import './Button.css';

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
          {this.state.gameLvl === '' ? this.renderForm() : this.renderBoard()}
        </div>
      );
  }

  renderForm() {
    return (
      <div className="FormButtons">
        <h1>Sudoku</h1>
        <h2>New game:</h2>
        <div className='ButtonGroup'>
          <button className='Button' onClick={() => this.setState({gameLvl: "easy"})}>Easy</button>
          <button className='Button' onClick={() => this.setState({gameLvl: "medium"})}>Medium</button>
          <button className='Button' onClick={() => this.setState({gameLvl: "hard"})}>Hard</button>
          <button className='Button' onClick={() => this.setState({gameLvl: "very-hard"})}>Very-Hard</button>
          <button className='Button' onClick={() => this.setState({gameLvl: "insane"})}>Insane</button>
          <button className='Button' onClick={() => this.setState({gameLvl: "inhuman"})}>Inhuman</button>
        </div>
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
