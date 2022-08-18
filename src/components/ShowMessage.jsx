import React from 'react'
import Animation from './Animation'

function ShowMessage(props) {
  return (
    <div className='before-search'>
      <Animation animationData={props.animationData} width={props.width} height={props.height}></Animation>
      {props.value}
    </div>
  )
}

export default ShowMessage