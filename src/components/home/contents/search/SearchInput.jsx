import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeAllLocalStorageItems } from '../../../../common/utils/local_storage'
import { bookActions } from '../../../../modules/actions'
import './Search.css'

function SearchInput() {
  const dispatch = useDispatch()
  const query = useSelector(store => store.bookStore.searchParams.query)
  const navigate = useNavigate()

  //검색창
  const onChange = (e) => {
    dispatch(bookActions.setSearchParamsQuery(e.target.value))
  }

  //새로운 검색 시 state 초기화
  const initSearch = () => {
    dispatch(bookActions.setNewSearchPage())
    dispatch(bookActions.initSearchBooks())
    removeAllLocalStorageItems()
  }

  //엔터 누르면 원하는 도서 검색
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      initSearch()
      navigate(query)
    }
  }

  return (
    <section className='search-input-container'>
      <div className='search-icon'>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input type='text' placeholder='도서명, 저자명으로 검색해보세요.'
        onChange={onChange}
        onKeyPress={handleSearch} />
    </section>
  )
}

export default SearchInput