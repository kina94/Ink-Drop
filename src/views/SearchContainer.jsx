import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import ShowMessage from '../components/home/common/alert/ShowMessage'
import SearchResult from '../components/home/contents/search/SearchResult'
import SearchInput from '../components/home/contents/search/SearchInput'
import animationData from '../assets/animation/72170-books.json'
import './Container.css'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions } from '../modules/actions'

function SearchContainer(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const location = useLocation()
  const navigate =useNavigate()
  const savedScroll = localStorage.getItem('scroll')
  const searchBooks = useSelector(store=>store.bookStore.searchResultBooks)
  const searchParams = useSelector(store=>store.bookStore.searchParams)
  
  // 도서API 호출
  const FetchBooks = async () => {
    const response = await props.bookRepository.searchBooks(searchParams)
    if(response.data.meta.is_end && response.data.meta.pageable_count!=0 &&
      document.querySelector('.content').scrollTop!=0){
      return alert('마지막 검색 결과입니다.')
    } else {
      dispatch(bookActions.getSearchBooks(response.data.documents))
    }
  }

  //SearchParams의 page가 변경될 때마다 FetchBooks를 요청
  //params를 로컬스토리지에 저장
  useEffect(() => {
    if (searchParams.query != '') {
      FetchBooks()
      location.pathname!='/home/search' && localStorage.setItem('params', JSON.stringify(searchParams))
    }
  }, [params, searchParams.page])

  //localstorage에 검색된 책 저장
  useEffect(() => {
    location.pathname!='/home/search' && localStorage.setItem('books', JSON.stringify(searchBooks))
  }, [searchBooks])

  //새로고침 및 탭 이동 시 서칭하던 스크롤이 있는 곳으로 이동
  useEffect(()=>{
    document.querySelector('.content').scrollTo(0, savedScroll)
  },[props.userInfo.userId])

  //뒤로가기 및 앞으로 가기 처리
  window.onpopstate = function(){
      navigate('/home/search')
  }

  return (
    <section className='search'>
      <SearchInput/>
      <Routes>
        <Route exact={true} path='/' element={<ShowMessage
        animationData={animationData}
        width='300px' height='300px'
        value='원하는 책을 검색하고 저장해보세요.' />} />
        <Route path=':keyword' element={<SearchResult
          userInfo={props.userInfo}
          message={`'${params['*']}'에 대한 검색 결과`} />} />
      </Routes>
    </section>
  )
}

export default SearchContainer