import React, { Component } from 'react';

import Board from './Board';
import { decipher } from './helpers.js'

import './App.css';
import './Button.css';
import './LoadGame.css';

class LoadGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      save: '',
      validation: '',

      board: [],
      initialBoard: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ save: e.target.value });
    this.convertSave(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.board && this.state.initialBoard) this.loadGame();
  }

  convertSave(save) {
    const deciphered = decipher(save);
    const board = deciphered.split('/')[0].split('|');
    const initialBoard = deciphered.split('/')[1];
    if (board.length === 81 && initialBoard.length === 81) {
      this.setState({ 
        board,
        initialBoard,
        validation: true,
      });

    } else {
      this.setState({ 
        validation: false,
        board: [],
        initialBoard: ''
      })
    }
  }

  loadGame() {
    this.setState({ loaded : true });
  }

  renderLoadedBoard() {
    return (
      <Board
        initialBoard = {this.state.initialBoard}
        board = {this.state.board}
        showMenu={this.props.showMenu}
      />
    );
  }

  renderForm() {
    let alert;
    switch (this.state.validation) {
      case false: 
        alert = <p className='form__alert form__alert--wrong'>The game save is not valid.</p>
        break;
      case true:
        alert = <p className='form__alert form__alert--correct'>The game save is valid. Click 'Load' button to start.</p>
        break;
      default:
        alert = <p className='form__alert'>Paste your game save above.</p>
    }

    return (
      <div className='load'>
        <h2>Load game:</h2>
        <form className='form' onSubmit={this.handleSubmit}>
          <input
            className='form__input'
            id="load-game"
            onChange={this.handleChange}
          />
          <button className='Button form__submit'>Load</button>
          <label className='form__label' htmlFor="load-game">
            {alert}
          </label>
        </form>
        <button className='Button' onClick={this.props.showMenu}>&crarr; Menu</button>
      </div>
    )
  }

  render() {
    let toRender = this.state.loaded ? this.renderLoadedBoard() : this.renderForm();
    return (
      <div>
        {toRender}
      </div>
    );

  }

}

export default LoadGame;