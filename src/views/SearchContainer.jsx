import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import SearchResult from '../components/home/contents/search/SearchResult'
import SearchInput from '../components/home/contents/search/SearchInput'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import animationData from '../assets/animation/72170-books.json'
import './Container.css'

function SearchContainer(props) {
  const params = useParams()
  const savedBooks = JSON.parse(localStorage.getItem('books'))
  const savedParams = JSON.parse(localStorage.getItem('params'))
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState(savedBooks ? savedBooks : [])
  const [searchParams, setSearchParams] = useState(
    savedParams ? savedParams : {
      query: '',
      page: 0,
    })

  // 도서API 호출
  const FetchBooks = async () => {
    const response = await props.bookRepository.searchBooks(searchParams)
    setBooks([...books, ...response.data.documents])
  }

  //새로운 검색 시 state 초기화
  const initSearch = () => {
    setSearchParams({ ...searchParams, page: 1 })
    setBooks([])
  }

  // 하단까지 스크롤 시 페이지 증가
  const addPageNum = () => {
    setSearchParams({ ...searchParams, page: searchParams.page + 1 })
  }

  //SearchParams의 page가 변경될 때마다 FetchBooks 요청
  useEffect(() => {
    setIsLoading(true)
    if (searchParams.query != '') {
      FetchBooks()
    }
    setIsLoading(false)
  }, [searchParams.page])

  //localstorage 저장
  useEffect(() => {
    localStorage.setItem('params', JSON.stringify(searchParams))
    localStorage.setItem('books', JSON.stringify(books))
  }, [books, searchParams])


  return (
    <section className='search'>
      {
        isLoading && <LoadingSpinner></LoadingSpinner>
      }
      <SearchInput
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        initSearch={initSearch}
        {...props}
      ></SearchInput>
      <Routes>
        <Route exact={true} path='/' element={<ShowMessage animationData={animationData} width='300px' height='300px' value='원하는 책을 검색하고 저장해보세요.' />} />
        <Route path=':keyword' element={<SearchResult
          books={books}
          savedBooks={props.savedBooks}
          addPageNum={addPageNum}
          userInfo={props.userInfo}
          bookRepository={props.bookRepository}
          onClickUpdateOrAdd={props.onClickBookUpdateOrAdd}
          message={`'${params['*']}'에 대한 검색 결과`} />} />
      </Routes>
    </section>
  )
}

export default SearchContainer