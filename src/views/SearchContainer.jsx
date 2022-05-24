import React, { useState } from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import BeforeSearch from '../components/contents/search/BeforeSearch'
import SearchResult from '../components/contents/search/SearchResult'
import SearchInput from '../components/contents/search/SearchInput'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import { BookService } from '../service/book_service'
import './Container.css'

function SearchContainer(props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [keyword, setKeyword] = useState('')

  //검색창
  const onChange = (e) => {
    setKeyword(e.target.value)
  }

  //검색 시 키워드로 도서 검색하여 state 저장
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