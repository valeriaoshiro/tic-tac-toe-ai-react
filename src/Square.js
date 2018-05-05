import React from 'react';

const Square = ({value, index, turn, onClick}) => {
    return <div id={index} key={index}><p>{value}</p></div>
}

export default Square;