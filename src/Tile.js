import React from 'react';
import './Tile.css';

const Tile = props => {
    return (
        <div className={'Tile'}>
            <input
                className={!props.isGenerated ? 'Tile__Input' : 'Tile__Input Tile__Input--Locked'}
                readOnly={props.isGenerated}
                value={props.value !== '.' ? props.value : ''}
                type="number"
                min="1"
                max="9"
                onChange={props.onChange}

            />
        </div>           
    )
};

export default Tile;