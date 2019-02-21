import React from 'react';
import './Tile.css';

const Tile = props => {
    if (props.isGenerated) {
        return (
            <input
                value={props.value}
                className={'Tile Tile--Locked'}
                readOnly
            />
        );
    } else {
        return (
            <input
                value={props.value !== '.' ? props.value : ''}
                className={props.isGenerated ? 'Tile Tile--Locked' : 'Tile'}
                type="number"
                onChange={props.onChange}
            />            
        )
    }
};

export default Tile;