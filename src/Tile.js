import React from 'react';
import './Tile.css';

const Tile = props => (
    <input
        value={props.value !== '.' ? props.value : ''}
        className={props.isGenerated ? 'Tile Tile--Locked' : 'Tile'}
        type="number"
        onChange={props.onChange}
    />
);

export default Tile;