import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import Category from '../components/contents/library/Category'
import SavedBooksByCategory from '../components/contents/library/SavedBooksByCategory'
import ContentsNothing from '../components/contents/library/ContentsNothing'
import { BookService } from '../service/book_service'

function LibraryContainer(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [savedBooks, setSavedBooks] = useState()
  const category = params['*']

  // 전체, 읽은책, 읽고 있는 책, 읽고 싶은 책 카테고리 선택
  const onClickCategory = (e) => {
    const id = e.target.closest('button').id
    navigate(`/home/library/${id}`)
  }

  // 저장된 책 삭제
  const onClickDelete = (e) =>{
    if(window.confirm('정말 삭제하시겠어요?')){
      setSavedBooks(book=>{
        const update = {...book}
        const id = Object.keys(update).filter(key=>update[key].isbn===e.target.id)
        delete update[id]
        return update
      })
      BookService.deleteBook(props.userInfo.userId, e.target.id)
      alert('삭제가 완료되었습니다.')
    }
  }

  // 저장되어 있는 책을 카테고리에 따라 필터링해서 불러오기
  const getSavedBooks = async () => {
    setIsLoading(true)
    const books = await BookService.syncBooks(props.userInfo.userId)
    let processedBooks = null
    if (books != null) {
      if (category === 'all') {
        processedBooks = Object.keys(books).map(key => books[key]) // 키-밸류 객체를 배열 형태로 변환
      } else {
        processedBooks = Object.keys(books).filter(key => books[key].type === category)
          .map(key => books[key])
      }
    }
    setSavedBooks(processedBooks)
    setIsLoading(false)
  }

  useEffect(() => {
    getSavedBooks(category)
  }, [params])

  return (
    <section className='library'>
      {
        isLoading && <LoadingSpinner></LoadingSpinner>
      }
      <Category onClickCategory={onClickCategory}></Category>
      <Routes>
        <Route exact={true} path='/' element={<ContentsNothing />} />
        <Route exact={true} path=':category' element={<SavedBooksByCategory
        userInfo={props.userInfo} savedBooks={savedBooks}
        onClickDelete={onClickDelete}
        />} />
      </Routes>
    </section>
  )
}

export default LibraryContainer