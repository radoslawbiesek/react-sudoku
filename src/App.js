import React, { Component } from 'react';

import LoadGame from './LoadGame';
import NewGame from './NewGame';

import './App.css';
import './Button.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'menu',
    }
  }

  setStatus(status) {
    this.setState({ gameStatus: status });
  }

  showMenu() {
    this.setStatus('menu');
  }

  render() {
      let toRender;

      switch (this.state.gameStatus) {
        case 'load':
          toRender = this.renderLoadGame();
          break;
        case 'new':
          toRender = this.renderNewGame();
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
        <button className='Button' onClick={() => this.setStatus('load')}>Load Game</button>
      </div>
    )
  }

  renderNewGame() {
    return (
      <NewGame
        showMenu={this.showMenu.bind(this)}
      />
    );
  }

  renderLoadGame() {
    return (
      <LoadGame
        showMenu={this.showMenu.bind(this)}
      />   
    )
  }
}

export default App;