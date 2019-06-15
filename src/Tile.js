import React from 'react';
import './Tile.css';

const Tile = props => {
    return (
        <div className={props.status ? 'Tile Tile--' + props.status : 'Tile'}>
            <input
                className='Tile__Input'
                disabled={props.status === 'Locked'}
                value={props.value !== '.' ? props.value : ''}
                type="number"
                min={1}
                max={9}
                onChange={props.onChange}
            />
        </div>           
    )
};

export default Tile;