import React from 'react'

function SaveOptionButton(props) {
    const switchValue = (name) => {
        switch (name) {
            case '읽은 책':
                return (
                    <span>
                        <i id='icon' className="fas fa-flag"></i>
                        {name}
                    </span>)
            case '읽고 있는 책':
                return (
                    <span>
                        <i id='icon' className="fas fa-book-open"></i>
                        {name}
                    </span>
                )
            case '읽고 싶은 책':
                return (
                    <span>
                        <i id='icon' className="fas fa-heart"></i>
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