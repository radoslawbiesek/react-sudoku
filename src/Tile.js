import React from 'react';
import './Tile.css';

const Tile = props => (
    <input
        value={props.value !== '.' ? props.value : null}
        className={props.isGenerated ? 'Tile Tile--Locked' : 'Tile'}
        type="number"
    />
);

export default Tile;