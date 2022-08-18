import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SaveOptionButton(props) {
    const switchValue = (name) => {
        switch (name) {
            case '읽은 책':
                return (
                    <span>
                        <FontAwesomeIcon icon='fas fa-flag' id='icon'/>
                        {name}
                    </span>)
            case '읽고 있는 책':
                return (
                    <span>
                        <FontAwesomeIcon id='icon' icon="fas fa-book-open"/>
                        {name}
                    </span>
                )
            case '읽고 싶은 책':
                return (
                    <span>
                        <FontAwesomeIcon id='icon' icon="fas fa-heart"/>
                        {name}
                    </span>
                )
        }
    }
    return (
        <button id={props.option}
            className={props.selectedOption === props.option ? 'active' : ''}
            onClick={props.onClick}>{switchValue(props.name)}</button>
    )
}

export default SaveOptionButton