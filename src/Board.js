import React, {Component} from 'react';
import './Board.css';
import Tile from './Tile';
import sudoku from 'sudoku-umd';
import './Button.css';

class Board extends Component {
    constructor(props) {
        super(props);
        const INITIAL_BOARD = sudoku.generate(this.props.gameLvl);
        this.state = {
            initialBoard: INITIAL_BOARD,
            board: [...INITIAL_BOARD],
            solvedBoard: sudoku.solve(INITIAL_BOARD),
            checkMode: false,
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
                    <button className='Button Button--Disabled' disabled>Save</button>
                    <button className='Button' onClick={this.props.showMenu}>&crarr; Menu</button>
                </div>
            </div>
        );
    }
}

export default Board;