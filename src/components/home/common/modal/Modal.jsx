import React, { useEffect } from 'react'
import './Modal.css'

function Modal(props) {
    const handleModalClose = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                props.setIsToggle(false)
            }
        })
        window.addEventListener('click', (e) => {
            try {
                if (e.target.className === 'modal') {
                    props.setIsToggle(false)
                }
                if (e.target.closest('button').className === 'close') {
                    props.setIsToggle(false)
                }
            } catch {
                return
            }
        })
    }

    useEffect(() => {
        handleModalClose()
    }, [])

    return (
        <div className={props.isToggle? 'modal' : 'modal hide'}>
            <div className={props.isToggle ? 'content-wrapper' : 'content-wrapper hide'}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal