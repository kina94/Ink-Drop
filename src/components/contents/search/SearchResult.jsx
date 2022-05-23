import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookInfo from './BookInfo'
import './Search.css'

function SearchResult(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [isToggle, setIsToggle] = useState(false)
  const [selectedBook, setSelectedBook] = useState([])

  // 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
  const onClickBook = (e) => {
    const id = e.target.closest('li').id
    const book = props.books[id]
    setIsToggle(true)
    setSelectedBook(book)
  }

  // 모달 없애기
  const handleModalClose = (e) =>{
    window.addEventListener('keydown', (e)=>{
      if(e.key==='Escape'){
        setIsToggle(false)
      }
    })
    window.addEventListener('click', (e)=>{
      try{
        if(e.target.className==='book-info'){
          setIsToggle(false)
        }
        if(e.target.closest('button').className==='close'){
          setIsToggle(false)
        }
      } catch{
        return
      }

    })
  }

  useEffect(() => {
    handleModalClose()
  }, [])

  return (
    <ul>
      <span>{params.keyword}에 대한 도서 검색 결과 {props.books.length}건</span>
      {
        props.books.length === 0 ? '검색 결과가 없습니다.' :
          props.books.map((book, index) => {
            return (
              <li key={index} id={index} onClick={onClickBook}>
                <img src={book.thumbnail}></img>
                <div>
                  <p>{book.title}</p>
                  <p>{book.authors}</p>
                  <p>{book.publisher} / {book.price}원</p>
                  <p>{book.contents}</p>
                </div>
              </li>
            )
          })
      }
      {
        isToggle ?
          <BookInfo selectedBook={selectedBook}/> : null
      }
    </ul>
  )
}

export default SearchResult