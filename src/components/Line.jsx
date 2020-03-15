import React from 'react';

import Cell from './Cell'

export default function Line(props) {
    return (
        <div className="Line" onClick={() => props.handleClick()}>
            {[...Array(props.cells.length)].map((x, j) => 
            <Cell key={j} value={props.cells[j]}></Cell>)}
        </div>
    )
}
