import React, { useState, useEffect, useReducer } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import LibrarySidebar from '../components/home/contents/library/LibrarySidebar'
import SavedBooksByCategory from '../components/home/contents/library/SavedBooksByCategory'
import animationData from '../assets/animation/72170-books.json'
import { useSelector } from 'react-redux'

function LibraryContainer() {
  const savedBooks = useSelector(store => store.bookStore.savedBooks)
  const params = useParams()
  const category = params['*']
  const [filteredBooks, setFilteredBooks] = useState()

  // 저장되어 있는 책을 카테고리에 따라 필터링해서 불러오기
  const getBooksByCategory = () => {
    let processedBooks = null
    if (savedBooks != null) {
      if (category === 'all') {
        processedBooks = Object.keys(savedBooks).map(key => savedBooks[key]) // 키-밸류 객체를 배열 형태로 변환
      } else {
        processedBooks = Object.keys(savedBooks).filter(key => savedBooks[key].type === category)
          .map(key => savedBooks[key])
      }
    }
    const sortBooks = processedBooks && processedBooks.sort((a, b) => {
      if (a.addDate > b.addDate) return -1
      else if (b.addDate > a.addDate) return 1
      else return 0
    })
    setFilteredBooks(sortBooks)
  }


  useEffect(() => {
    getBooksByCategory()
  }, [params])

  return (
    <section className='library'>
      <LibrarySidebar />
      <Routes>
        <Route exact={true} path='/' element={<ShowMessage
          value={'카테고리를 선택해주세요.'}
          animationData={animationData}
          width={'200px'}
          height={'200px'}
        />} />
        <Route exact={true} path=':category' element={<SavedBooksByCategory
          filteredBooks={filteredBooks}
        />} />
      </Routes>
    </section>
  )
}

export default LibraryContainer