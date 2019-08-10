import React, {Component} from 'react';
import sudoku from 'sudoku-umd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Tile from './Tile';
import { cipher } from './helpers.js';

import './Board.css';
import './Button.css';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: this.props.initialBoard,
            board: this.props.board,
            solvedBoard: sudoku.solve(this.props.initialBoard),
            checkMode: false,
            saveAlert: false,
        }
    }
    
    handleChange(index, event) {
        const board = this.state.board;
        board[index] = event.target.value;
        this.setState({board});
    }

    checkBoard() {
        this.setState({checkMode: !this.state.checkMode});
    }

    hintBoard() {
        let currentlyCorrectBoard = '';

        [...this.state.board].forEach((element, index) => {
            if (element === this.state.solvedBoard[index]) {
                currentlyCorrectBoard += element;
            } else {
                currentlyCorrectBoard += '.';
            }
        });

        let board = [];
        sudoku.get_candidates(currentlyCorrectBoard).forEach(row => {
            row.forEach(tile => board.push(tile))
        });
        this.setState( {board} );
    }
    
    solveBoard() {
        const board = [...this.state.solvedBoard];
        this.setState({
            board, 
            checkMode: true
        });
    }

    resetBoard() {
        const board = [...this.state.initialBoard];
        this.setState({ 
            board,
            checkMode: false,
        });
    }

    showAlert() {
        this.setState({ saveAlert : true });
        window.setTimeout(
            () => this.setState({ saveAlert : false }),
            3000
        );
    }



    render() {
        const tiles = this.state.board.map((tile, index) => {
            
            let status;
            if (this.state.initialBoard[index] === this.state.solvedBoard[index]) {
                status = 'Locked';
            } else if (this.state.checkMode) {
                switch (tile) {
                    case this.state.solvedBoard[index]:
                        status = 'Correct'
                        break;
                    default:
                        status = 'Wrong';
                }
            }
            
            return (
                <Tile
                key={index}
                value={tile}
                status={status}
                onChange={this.handleChange.bind(this, index)}
                />
            )
        });
        
        return (
            <div className="Board">
                <div className="Grid">
                    {tiles}
                </div>
                <div className="Buttons">
                    <button className={this.state.checkMode ? 'Button Button--Checked' : 'Button'} onClick={() => this.checkBoard()}>Check</button>
                    <button className='Button' onClick={() => this.hintBoard()}>Hint</button>
                    <button className='Button' onClick={() => this.solveBoard()}>Solve</button>
                    <button className='Button' onClick={() => this.resetBoard()}>Reset</button>
                    <CopyToClipboard 
                        text={cipher(`${this.state.board.join('|')}/${this.state.initialBoard}`)}
                        onCopy={() => this.showAlert()}
                    >
                        <button className='Button'>Save</button>
                    </CopyToClipboard>
                    <button className='Button' onClick={this.props.showMenu}>&crarr; Menu</button>
                </div>
                {this.state.saveAlert ? <p className='save-alert'>Copied to clipboard!</p> : <p className='save-alert save-alert__hidden'>_</p>}
            </div>
        );
    }
}

export default Board;