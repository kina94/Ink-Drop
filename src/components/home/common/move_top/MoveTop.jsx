import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './MoveTop.css'

function MoveTop() {
  return (
    <div className='move-top' onClick={()=>document.querySelector('.content').scrollTo(0,0)}>
        <FontAwesomeIcon icon='fas fa-angle-up' size='2xl'/>
    </div>
  )
}

export default MoveTop