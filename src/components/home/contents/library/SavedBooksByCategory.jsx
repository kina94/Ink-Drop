import React, {useEffect, useState} from 'react'
import BookList from '../book/BookList'
import BookBasicInfo from '../book/BookBasicInfo'
import SavedBookContents from './SavedBookContents'

// 카테고리에 저장된 책 보여주기
function SavedBooksByCategory(props) {
  const [isToggle, setIsToggle] = useState(false)
  const [selectedBook, setSelectedBook] = useState([])

  /* 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
  토글 버튼을 활성화하고, 저장된 책 중 선택한 책을 state에 저장한다.
  중복 사용되는 함수로 재사용성을 위해 분리 필요*/
  const onClickBook = (e) => {
    const id = e.target.closest('li').id
    const book = props.savedBooks[id] // 이부분만 다름
    setIsToggle(true)
    setSelectedBook(book)
  }

  /* 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
  중복 사용되는 함수로 재사용성을 위해 분리 필요*/
  const handleModalClose = () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsToggle(false)
      }
    })
    window.addEventListener('click', (e) => {
      try {
        if (e.target.className === 'book-info') {
          setIsToggle(false)
        }
        if (e.target.closest('button').className === 'close') {
          setIsToggle(false)
        }
      } catch {
        return
      }

    })
  }

  useEffect(() => {
    handleModalClose()
  }, [])

  return (
    <div>
      {
        !props.savedBooks ? '없어' :
          Object.keys(props.savedBooks).map((key, index) => {
            return (
              <>
                <button id={props.savedBooks[key].isbn}
                  onClick={props.onClickDelete}>삭제</button>
                <BookList book={props.savedBooks[key]} index={index}
                clickEvent={onClickBook}/>
              </>)
          })
      }

      {
        isToggle ?
          <div className='book-info'>
            <div className='content-wrapper'>
              <BookBasicInfo selectedBook={selectedBook} />
              <SavedBookContents selectedBook={selectedBook} userInfo={props.userInfo}/>
            </div>
          </div> : null
      }
    </div>
  )
}

export default SavedBooksByCategory