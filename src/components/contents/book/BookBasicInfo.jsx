import React, { useState } from 'react'
import './Book.css'

// 책 기본 정보 보여주기
function BookBasicInfo(props) {
  const { thumbnail, authors, contents, publisher, title, url } = props.selectedBook

  return (
    <>
      <section className='title'>
        <span>{title}</span>
        <button className='close'><i className="fas fa-times"></i></button>
      </section>
      <section className='information'>
        <img src={thumbnail}></img>
        <p>{authors} / {publisher}</p>
        <hr></hr>
        <p>책 소개</p>
        <p>{contents}
          <a href={url} target='_blank'>더 보러가기</a>
        </p>
      </section>
    </>
  )
}

export default BookBasicInfo