import React from 'react';
import './Square.css';

const Square = ({value, index, turn, onClick}) => {
    return (
        <div id={index} className="Square">
            <p>{value}</p>
        </div>
    )
}

export default Square;