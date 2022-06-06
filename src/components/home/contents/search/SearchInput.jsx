import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'

function SearchInput(props) {
  const navigate = useNavigate()

  //검색창
  const onChange = (e) => {
    props.setSearchParams({ ...props.searchParams, query: e.target.value})
  }

  //엔터 누르면 원하는 도서 검색
  const handleSearch = async(e) => {
    if (e.key === 'Enter') {
      props.initSearch()
      navigate(props.searchParams.query)
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