import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryContents(props) {
  return (
    <div>
      {
        props.savedBooks && Object.keys(props.savedBooks).map(item=>{
          return props.savedBooks[item].type
        })
      }
    </div>
  )
}

export default CategoryContents