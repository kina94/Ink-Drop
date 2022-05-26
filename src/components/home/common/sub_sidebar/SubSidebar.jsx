import React from 'react'
import { useParams } from 'react-router-dom'
import './SubSidebar.css'

function SubSidebar(props) {
    const params = useParams()
    return (
            <li
                className={props.id === params['*'] ? 'active' : ''}
                key={props.index}
                id={props.id}
                onClick={props.onClickCategory}>
                {props.value}
                <i id='icon' className="fa-solid fa-angle-right"></i>
            </li>
    )
}

export default SubSidebar