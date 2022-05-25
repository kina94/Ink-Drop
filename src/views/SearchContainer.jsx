import React, { useState } from 'react'
import {Route, Routes, useNavigate, useParams } from 'react-router-dom'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import SearchResult from '../components/home/contents/search/SearchResult'
import SearchInput from '../components/home/contents/search/SearchInput'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import animationData from '../assets/animation/72170-books.json'
import { BookService } from '../service/book_service'
import './Container.css'

function SearchContainer(props) {
  const params = useParams()
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
      const searchKeyword = keyword
      setIsLoading(true)
      const params = {
        query: keyword,
        page: 3,
      }
      const response = await BookService.searchBooks(params)
      setBooks(response.data.documents)
      navigate(`${searchKeyword}`)
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
        <Route exact={true} path='/' element={<ShowMessage animationData={animationData} width='300px' height='300px' value='원하는 책을 검색하고 저장해보세요.'/>} />
        <Route path=':keyword' element={<SearchResult books={books} 
        userInfo={props.userInfo}
        message={`'${params['*']}'에 대한 검색 결과`}/>} />
      </Routes>
    </section>
  )
}

export default SearchContainer