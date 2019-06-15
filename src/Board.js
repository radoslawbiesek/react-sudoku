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
            isBoardSolved: false,
            checkMode: false,
        }
    }
    
    handleChange(index, event) {
        const board = this.state.board;
        board[index] = event.target.value;
        this.setState({board});
    }

    resetBoard() {
        const board = [...this.state.initialBoard];
        this.setState({ 
            board,
            isBoardSolved: false,
            checkMode: false,
        });
    }
    
    solveBoard() {
        const board = [...this.state.solvedBoard];
        this.setState( {board} );
    }

    checkBoard() {
        if (this.state.board.join('') === this.state.solvedBoard) {
            this.setState({
                isBoardSolved: true,
            })
        }
        this.setState({checkMode: !this.state.checkMode});
    }

    render() {
        const tiles = this.state.board.map((tile, index) => {
            
            let status;
            if (this.state.initialBoard[index] === this.state.solvedBoard[index]) {
                status = 'generated';
            } else if (this.state.checkMode === true && this.state.board[index] !== this.state.solvedBoard[index]) {
                status = 'wrong';
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
                    <button className='Button' onClick={() => this.solveBoard()}>Solve</button>
                    <button className='Button' onClick={() => this.resetBoard()}>Reset</button>
                    <button className='Button' disabled>Save</button>
                    <button className='Button' onClick={this.props.showMenu}>Menu</button>
                </div>
                <p className="Alert">{alert}</p>
            </div>
        );
    }
}

export default Board;