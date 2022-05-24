import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import Category from '../components/contents/library/Category'
import CategoryContents from '../components/contents/library/CategoryContents'
import ContentsNothing from '../components/contents/library/ContentsNothing'
import { BookService } from '../service/book_service'

function LibraryContainer(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [savedBooks, setSavedBooks] = useState()
  const category = params['*']

  const onClickCategory = (e) => {
    const id = e.target.closest('button').id
    navigate(`/home/library/${id}`)
  }

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
      setSavedBooks(processedBooks)
    }
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
        <Route exact={true} path=':category' element={<CategoryContents savedBooks={savedBooks} />} />
      </Routes>
    </section>
  )
}

export default LibraryContainer