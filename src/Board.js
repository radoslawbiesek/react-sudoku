import React, {Component} from 'react';
import './Board.css';
import Tile from './Tile';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [...this.props.initialBoard],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index) {
        console.log('Index: ' + this.index);
        const board = [...this.state.board];
        board[this.index] = event.target.value;
        this.setState({board});
    }

    render() {
        const tiles = this.state.board.map((tile, index) => (
            <Tile
              key={index}
              value={tile}
              isGenerated={true}
              onChange={(event, index) => this.handleChange(event, index)}
            />
        ));
        return (
            <div className="Board">
                {tiles}
            </div>
        );
    }
}

export default Board;