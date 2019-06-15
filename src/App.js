import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import './Button.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'menu',
    }
  }

  setStatus(status) {
    console.log(status);

    this.setState({gameStatus: status});
  }

  showMenu() {
    this.setStatus('menu');
  }

  render() {
      let toRender;
      switch (this.state.gameStatus) {

        case 'easy':
        case 'medium':
        case 'hard':
        case 'very-hard':
        case 'insane':
        case 'inhuman':
          toRender = this.renderBoard(this.state.gameStatus);
          break;

        case 'new':
          toRender = this.renderForm();
          break;

        default:
          toRender = this.renderMenu();
      }

    return (
      <div className="App">
        {toRender}
      </div>
    );
  }

  renderMenu() {
    return (
      <div>
        <h1>Sudoku</h1>  
        <button className='Button' onClick={() => this.setStatus('new')}>New Game</button>
        <button className='Button' disabled>Load Game</button>
      </div>
    )
  }

  renderForm() {
    const LEVELS = ['easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman'];
    const buttons = LEVELS.map((level, index) => {
      return (<button className='Button' key={index} onClick={() => this.setStatus(level)}>{level.charAt(0).toLocaleUpperCase() + level.slice(1)}</button>)
    })

    return (
      <div>
        <h2>New game:</h2>
        <div className='ButtonGroup'>
          {buttons}
          <button className='Button' onClick={() => this.setStatus('menu')}>&crarr; Menu</button>
        </div>
      </div>
    );
  }

  renderBoard(lvl) {
    return (
      <Board
        gameLvl={lvl}
        showMenu={this.showMenu.bind(this)}
      />
    );
  }
}

export default App;