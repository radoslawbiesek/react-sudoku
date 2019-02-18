import React, {Component} from 'react';
import './Board.css';
import Tile from './Tile';


class Board extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const tiles = this.props.values.map((tile, index) => (
            <Tile
              key={index}
              value={tile}
              isGenerated="true"
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