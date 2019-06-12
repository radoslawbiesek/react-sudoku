import React, {Component} from 'react';
import './Board.css';
import Tile from './Tile';
import sudoku from 'sudoku-umd';

class Board extends Component {
    constructor(props) {
        super(props);
        const INITIAL_BOARD = sudoku.generate(this.props.gameLvl);
        this.state = {
            initialBoard: INITIAL_BOARD,
            board: [...INITIAL_BOARD],
            solvedBoard: sudoku.solve(INITIAL_BOARD),
            isBoardSolved: false,
        }
    }
    
    handleChange(index, event) {
        const board = this.state.board;
        board[index] = event.target.value;
        this.setState({board});
    }

    restartBoard() {
        const board = [...this.state.initialBoard];
        this.setState({ 
            board,
            isBoardSolved: false
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
    }

    render() {
        const tiles = this.state.board.map((tile, index) => {
            const isGenerated = !isNaN([...this.state.initialBoard][index]);
            return (
                <Tile
                key={index}
                value={tile}
                isGenerated={isGenerated}
                onChange={this.handleChange.bind(this, index)}
                />
            )
        });
        const alert = this.state.isBoardSolved ? 'You win!' : '';
        
        return (
            <div className="Board">
                <div className="Grid">
                    {tiles}
                </div>
                <div className="Buttons">
                    <button onClick={this.props.newGame}>New Game</button>
                    <button onClick={() => this.solveBoard()}>Solve</button>
                    <button onClick={() => this.restartBoard()}>Restart</button>
                    <button onClick={() => this.checkBoard()}>Check</button>
                </div>
                <p className="Alert">{alert}</p>
            </div>
        );
    }
}

export default Board;