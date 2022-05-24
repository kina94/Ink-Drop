import React, { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import BeforeSearch from '../components/contents/search/BeforeSearch'
import { BookService } from '../service/book_service'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import SearchResult from '../components/contents/search/SearchResult'
import SearchInput from '../components/contents/search/SearchInput'

function SearchContainer(props) {
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
      <SearchInput onChange={onChange} handleSearch={handleSearch}></SearchInput>
      <Routes>
        <Route exact={true} path='/' element={<BeforeSearch />} />
        <Route path=':keyword' element={<SearchResult books={books} 
        userInfo={props.userInfo}
        message={`${keyword}에 대한 검색 결과 ${books.length}건`}/>} />
      </Routes>
    </section>
  )
}

export default SearchContainer