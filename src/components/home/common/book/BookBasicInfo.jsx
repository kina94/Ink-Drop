import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Book.css'

// 책 기본 정보 보여주기
function BookBasicInfo() {
  const selectedBook = useSelector(store=>store.bookStore.selectedBook)
  useEffect(() => {
    document.querySelector('.content-wrapper').scrollTo(0, 0)
  }, [])
  let { thumbnail, authors, contents, publisher, title, url } = selectedBook
  return (
    <>
      <section className='title'>
        <span>{title}</span>
        <button className='close'><i className="fas fa-times"></i></button>
      </section>
      <section className='information'>
        <section>
          <img src={thumbnail}></img>
          <p>{authors && authors.join(' ')} / {publisher}</p>
        </section>
        <section>
          <p>책 소개</p>
          <p id='contents'>{contents}</p>
          <p><a id='link' href={url} target='_blank'>더 보러가기</a></p>
        </section>
      </section>
    </>
  )
}

export default BookBasicInfo