import React, { useEffect } from 'react'
import './Modal.css'

function Modal(props) {
    const handleModalClose = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                props.setIsToggle(false)
                props.setModifyMode(false)
            }
        })
        window.addEventListener('click', (e) => {
            try {
                if (e.target.className === 'modal') {
                    props.setIsToggle(false)
                    props.setModifyMode(false)

                }
                if (e.target.closest('button').className === 'close') {
                    props.setIsToggle(false)
                    props.setModifyMode(false)
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
        <div className={props.isToggle? 'modal' : 'modal modal-hide'}>
            <div className={props.isToggle ? 'content-wrapper' : 'content-wrapper hide'}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal