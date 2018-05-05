import React from 'react';
import './Square.css';

const Square = ({value, index, turn, onClick}) => { 
    return (
        <div 
            id={index} 
            className={'Square'} 
            onClick={() => onClick(index, value)}>
            <p>{typeof value === 'number' ? '' : value}</p>
        </div>
    )
}

export default Square;