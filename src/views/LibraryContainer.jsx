import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import LibrarySidebar from '../components/home/contents/library/LibrarySidebar'
import SavedBooksByCategory from '../components/home/contents/library/SavedBooksByCategory'
import { BookService } from '../service/book_service'
import animationData from '../assets/animation/72170-books.json'


function LibraryContainer(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState()
  const category = params['*']

  // 전체, 읽은책, 읽고 있는 책, 읽고 싶은 책 카테고리 선택
  const onClickCategory = (e) => {
    const id = e.target.closest('li').id
    navigate(`/home/library/${id}`)
    return id
  }

  // 저장된 책 삭제
  const onClickDelete = (e) => {
      props.onClickBookDelete(e)
  }

  //저장된 책 업데이트
  const onClickUpdateOrAdd = (newBook) => {
    props.onClickBookUpdateOrAdd(newBook)
  }

  // 저장되어 있는 책을 카테고리에 따라 필터링해서 불러오기
  const getBooksByCategory = () => {
    setIsLoading(true)
    let processedBooks = null
    if (props.savedBooks != null) {
      if (category === 'all') {
        processedBooks = Object.keys(props.savedBooks).map(key => props.savedBooks[key]) // 키-밸류 객체를 배열 형태로 변환
      } else {
        processedBooks = Object.keys(props.savedBooks).filter(key => props.savedBooks[key].type === category)
          .map(key => props.savedBooks[key])
      }
    }
    processedBooks && processedBooks.sort((a,b)=> {return a.addDate - b.addDate})
    setFilteredBooks(processedBooks)
    setIsLoading(false)
  }

  useEffect(() => {
    getBooksByCategory()
  }, [params])

  return (
    <section className='library'>
      {
        isLoading && <LoadingSpinner></LoadingSpinner>
      }
      <LibrarySidebar onClickCategory={onClickCategory}></LibrarySidebar>
      <Routes>
        <Route exact={true} path='/' element={<ShowMessage value={'카테고리를 선택해주세요.'}
          animationData={animationData}
          width={'200px'}
          height={'200px'}
        />} />
        <Route exact={true} path=':category' element={<SavedBooksByCategory
          userInfo={props.userInfo}
          savedBooks={props.savedBooks}
          bookRepository={props.bookRepository}
          onClickDelete={onClickDelete}
          onClickUpdateOrAdd={onClickUpdateOrAdd}
          filteredBooks={filteredBooks}
        />} />
      </Routes>
    </section>
  )
}

export default LibraryContainer