import React from 'react'
import Animation from '../../../../common/utils/Animation'
import animationData from '../../../../assets/animation/72170-books.json'

function BeforeSearch(props) {
  return (
    <div className='before-search'>
      <Animation animationData={animationData} width='300px' height='300px'></Animation>
      원하는 책을 검색해주세요.
    </div>
  )
}

export default BeforeSearch