import React, { useEffect, useState } from 'react'
import {Route, Routes, useNavigate, useParams } from 'react-router-dom'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import SearchResult from '../components/home/contents/search/SearchResult'
import SearchInput from '../components/home/contents/search/SearchInput'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import animationData from '../assets/animation/72170-books.json'
import './Container.css'

function SearchContainer(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 0,
  })

  //검색창
  const onChange = (e) => {
    setSearchParams({...searchParams, query: e.target.value})
  }

  // 도서API 호출
  const FetchBooks = async() =>{
    const response = await props.bookRepository.searchBooks(searchParams)
    setBooks([...books, ...response.data.documents])
    localStorage.setItem('books', JSON.stringify([...books, ...response.data.documents]))
  }
  

  // 새로운 검색인지 스크롤링인지 구분하여 state변경
  const searchBooks = (isScroll) => {
    setIsLoading(true)
    if (isScroll){
      setSearchParams({...searchParams, page:searchParams.page+1})
    } else {
      setSearchParams({...searchParams, page:1})
      setBooks([])
    }
    setIsLoading(false)
  }

  //엔터 누르면 원하는 도서 검색
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchKeyword = searchParams.query
      navigate(`${searchKeyword}`)
      searchBooks(false)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('books') && localStorage.getItem('params') && localStorage.getItem('scroll')){
      const books = JSON.parse(localStorage.getItem('books'))
      const params = JSON.parse(localStorage.getItem('params'))
      setBooks(books)
      setSearchParams({...searchParams, 
      page: params.page,
      query: params.query
      })
    }
  },[])
  
  useEffect(()=>{
    if(searchParams.page!=0 && searchParams.query!=''){
      FetchBooks()
      localStorage.setItem('params', JSON.stringify(searchParams))
      localStorage.setItem('params', JSON.stringify(searchParams))
    }
  },[searchParams])

  return (
    <section className='search'>
      {
        isLoading && <LoadingSpinner></LoadingSpinner>
      }
      <SearchInput onChange={onChange} handleSearch={handleSearch}></SearchInput>
      <Routes>
        <Route exact={true} path='/' element={<ShowMessage animationData={animationData} width='300px' height='300px' value='원하는 책을 검색하고 저장해보세요.'/>} />
        <Route path=':keyword' element={<SearchResult
        books={books} 
        savedBooks={props.savedBooks}
        userInfo={props.userInfo}
        searchBooks={searchBooks}
        bookRepository={props.bookRepository}
        onClickUpdateOrAdd={props.onClickBookUpdateOrAdd}
        message={`'${params['*']}'에 대한 검색 결과`}/>} />
      </Routes>
    </section>
  )
}

export default SearchContainer