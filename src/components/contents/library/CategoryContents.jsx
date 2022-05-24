import React from 'react'
import { useParams } from 'react-router-dom'
import BookList from '../book/BookList'

function CategoryContents(props) {
  console.log(props.savedBooks)
  return (
    <div>
      {
        props.savedBooks && 
        <BookList books={props.savedBooks} alertMessage='저장된 책이 없습니다.'></BookList>
      }
    </div>
  )
}

export default CategoryContents