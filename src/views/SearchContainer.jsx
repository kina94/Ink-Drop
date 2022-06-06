import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import SearchResult from '../components/home/contents/search/SearchResult'
import SearchInput from '../components/home/contents/search/SearchInput'
import LoadingSpinner from '../common/utils/LoadingSpinner'
import animationData from '../assets/animation/72170-books.json'
import './Container.css'
import LocalStorage from '../common/utils/local_storage'

function SearchContainer(props) {
  const params = useParams()
  const navigate =useNavigate()
  const savedBooks = JSON.parse(localStorage.getItem('books'))
  const savedParams = JSON.parse(localStorage.getItem('params'))
  const savedScroll = localStorage.getItem('scroll')
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState(savedBooks ? savedBooks : [])
  const [searchParams, setSearchParams] = useState({
      query: '',
      page: 0,
    })

  // 도서API 호출
  const FetchBooks = async () => {
    const response = await props.bookRepository.searchBooks(searchParams)
    if(response.data.meta.is_end && response.data.meta.pageable_count!=0){
      alert('마지막 검색 결과입니다.')
    } else {
      setBooks([...books, ...response.data.documents])
    }
  }

  //새로운 검색 시 state 초기화
  const initSearch = () => {
    setSearchParams({ ...searchParams, page: 1 })
    setBooks([])
    LocalStorage.removeAllItems()
  }

  // 하단까지 스크롤 시 페이지 증가
  const addPageNum = () => {
    const nextPage = savedParams ? savedParams.page+1 : searchParams.page+1
    const nextQuery = savedParams ? savedParams.query : searchParams.query
    setSearchParams({ ...searchParams, page: nextPage, query:nextQuery })
  }

  //SearchParams의 page가 변경될 때마다 FetchBooks를 요청하고 params 로컬스토리지 저장
  useEffect(() => {
    setIsLoading(true)
    if (searchParams.query != '') {
      FetchBooks()
      localStorage.setItem('params', JSON.stringify(searchParams))
    }
    setIsLoading(false)
  }, [params, searchParams.page])

  //localstorage에 검색된 책 저장
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  //새로고침 및 탭 이동 시 서칭하던 스크롤이 있는 곳으로 이동
  useEffect(()=>{
    document.querySelector('.content').scrollTo(0, savedScroll)
  },[])

  //뒤로가기 및 앞으로 가기 막기
  window.onpopstate = function(){
      navigate('/home/search')
  }

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
          message={`'${params['*']}'에 대한 검색 결과`} />} />
      </Routes>
    </section>
  )
}

export default SearchContainer