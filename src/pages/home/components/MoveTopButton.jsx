import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {useSelector} from 'react-redux'
import '../styles/MoveTopButton.css'

function MoveTopButton() {
  const isModalShow = useSelector(store=>store.toggleStore.modalToggle)

  const onClickMoveTop = () =>{
    const target = isModalShow ? '.content-wrapper' : '.content'
    document.querySelector(target).scrollTo(0,0)
  }
  return (
    <div className='move-top' onClick={onClickMoveTop}>
        <FontAwesomeIcon icon='fas fa-angle-up' size='2xl'/>
    </div>
  )
}

export default MoveTopButton