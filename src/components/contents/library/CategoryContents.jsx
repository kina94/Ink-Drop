import React from 'react'
import BookList from '../book/BookList'

function CategoryContents(props) {
  return (
    <div>
      {
        !props.savedBooks ? '없어' :
        Object.keys(props.savedBooks).map((key,index)=>{
          return <BookList book={props.savedBooks[key]} index={index}></BookList>
        })
      }
    </div>
  )
}

export default CategoryContents