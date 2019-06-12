import React from 'react';
import './Tile.css';

const Tile = props => {
    console.log(props.status);
    return (
        <div className={props.status !== 'wrong' ? 'Tile' : 'Tile Tile--Wrong'}>
            <input
                className={props.status === 'generated' ? 'Tile__Input Tile__Input--Locked' : 'Tile__Input'}
                readOnly={props.status === 'generated'}
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