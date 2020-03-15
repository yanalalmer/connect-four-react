import React from 'react';

export default function Cell(props) {
    return (
        <div className="Cell">
            <div className={props.value}></div>
        </div>
    )
}
