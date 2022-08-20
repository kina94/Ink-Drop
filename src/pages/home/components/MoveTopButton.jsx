import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../styles/MoveTopButton.css'

function MoveTopButton() {
  const onClickMoveTop = () =>{
    window.scrollTo(0,0)
  }
  return (
    <div className='move-top' onClick={onClickMoveTop}>
        <FontAwesomeIcon icon='fas fa-angle-up' size='2xl'/>
    </div>
  )
}

export default MoveTopButton