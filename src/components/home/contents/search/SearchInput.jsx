import React from 'react'
import './Search.css'

function SearchInput(props) {
  return (
    <section className='search-input-container'>
    <div className='search-icon'>
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
    <input type='text' placeholder='도서명, 저자명으로 검색해보세요.' onChange={props.onChange}
      onKeyPress={props.handleSearch} />
  </section>
  )
}

export default SearchInput