import React from 'react'

function OptionButton(props) {
    return (
        <button id={props.option}
            className={props.selectedOption === props.option ? 'active' : ''}
            onClick={props.onClick}>{props.name}</button>
    )
}

export default OptionButton