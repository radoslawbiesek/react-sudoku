import React, { Component } from 'react';
import sudoku from 'sudoku-umd';

import Board from './Board';

import './App.css';
import './Button.css';

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameLvl: '',
    }
  }

  setLvl(lvl) {
      this.setState({gameLevel: lvl});
  }

  renderForm() {
    const LEVELS = ['easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman'];
    const buttons = LEVELS.map((level, index) => {
      return (<button className='Button' key={index} onClick={()=>this.setLvl(level)}>{level.charAt(0).toLocaleUpperCase() + level.slice(1)}</button>)
    });

    return (
      <div>
        <h2>New game:</h2>
        <div className='ButtonGroup'>
          {buttons}
          <button className='Button' onClick={() => this.props.showMenu()}>&crarr; Menu</button>
        </div>
      </div>
    );
  }

  renderNewBoard(gameLvl) {
    const INITIAL_BOARD = sudoku.generate(gameLvl);
    return (
      <Board
        initialBoard = {INITIAL_BOARD}
        board = {[...INITIAL_BOARD]}
        showMenu={this.props.showMenu}
      />
    );
  }

  render() {
    let toRender;
    switch (this.state.gameLevel) {

    case 'easy':
    case 'medium':
    case 'hard':
    case 'very-hard':
    case 'insane':
    case 'inhuman':
        toRender = this.renderNewBoard(this.state.gameLevel);
        break;

    default:
        toRender = this.renderForm();
    }

    return (
      <div>
        {toRender}
      </div>
    );
  }


}

export default NewGame;