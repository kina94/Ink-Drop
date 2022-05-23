import React, { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import SearchResult from './SearchResult'
import BeforeSearch from './BeforeSearch'
import BookInfo from './BookInfo'
import { BookService } from '../../../service/book_service'
import LoadingSpinner from '../../../common/utils/LoadingSpinner'

function Search() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [keyword, setKeyword] = useState('')

  const onChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true)
      const params = {
        query: keyword,
        page: 3,
      }
      const response = await BookService.searchBooks(params)
      setBooks(response.data.documents)
      navigate(`${keyword}`)
    }
    setIsLoading(false)
  }

  return (
    <section className='search'>
      {
        isLoading && <LoadingSpinner></LoadingSpinner>
      }
      <section className='search-input'>
        <div className='search-icon'>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input type='text' placeholder='도서명, 저자명으로 검색해보세요.' onChange={onChange}
          onKeyPress={handleSearch} />
      </section>
      <Routes>
        <Route exact={true} path='/' element={<BeforeSearch />} />
        <Route path=':keyword' element={<SearchResult books={books} />} />
      </Routes>
    </section>
  )
}

export default Search