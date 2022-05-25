import React from 'react'
import Lottie from 'react-lottie'

function Animation(props) {
    const options ={
        animationData : props.animationData,
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
    }

  return (
      <Lottie options={options} width={props.width} height={props.height}></Lottie>
  )
}

export default Animation