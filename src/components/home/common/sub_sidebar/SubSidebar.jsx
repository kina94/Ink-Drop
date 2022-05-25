import React from 'react'

function SubSidebar(props) {
    return (
        <section className='sub-sidebar-container'>
            <button className="sub-sidebar"
                key={props.index}
                id={props.id}
                onClick={props.onClickCategory}>
                {props.value}
                <i id='icon' className="fa-solid fa-angle-right"></i>
            </button>
        </section>
    )
}

export default SubSidebar