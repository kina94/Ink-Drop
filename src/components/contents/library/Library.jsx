import React, { useEffect, useState } from 'react'
import { BookService } from '../../../service/book_service'
import Category from './Category'
import CategoryContents from './CategoryContents'
import './Library.css'

function Library(props) {
    const [category, setCategory] = useState(false)
    const [savedBooks, setSavedBooks] = useState([])

    const getCategory = (e) => {
        setCategory(e.target.id)
    }

    const getSavedBooks = async() =>{
        const books = await BookService.syncBooks(props.userInfo.userId)
        console.log(books)
    }

    useEffect(()=>{
        getSavedBooks()
    },[])

    return (
        <section className='library'>
            <Category getCategory={getCategory}></Category>
            <CategoryContents savedBooks={savedBooks}></CategoryContents>
        </section>
    )
}

export default Library