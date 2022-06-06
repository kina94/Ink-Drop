import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleActions } from '../../../../modules/actions'
import './Modal.css'

function Modal(props) {
    const dispatch = useDispatch()
    const isModalShow = useSelector(store=>store.toggleStore.modalToggle)
    const handleModalClose = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dispatch(toggleActions.toggleModal(false))
                dispatch(toggleActions.toggleModifyMode(false))
            }
        })
        window.addEventListener('click', (e) => {
            try {
                if (e.target.className === 'modal') {
                    dispatch(toggleActions.toggleModal(false))
                    dispatch(toggleActions.toggleModifyMode(false))
                }
                if (e.target.closest('button').className === 'close') {
                    dispatch(toggleActions.toggleModal(false))
                    dispatch(toggleActions.toggleModifyMode(false))
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
        <div className={isModalShow? 'modal' : 'modal modal-hide'}>
            <div className={isModalShow ? 'content-wrapper' : 'content-wrapper hide'}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal