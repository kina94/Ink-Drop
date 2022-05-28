import React, { useEffect, useState } from 'react'
import BookList from '../../common/book/BookList'
import BookBasicInfo from '../../common/book/BookBasicInfo'
import SavedBookContents from './SavedBookContents'
import { useNavigate } from 'react-router-dom'
import './Library.css'
import { option } from '../../../../common/utils/common_var'
import { useParams } from 'react-router-dom'
import ShowMessage from '../../common/alert/ShowMessage'
import animationData from '../../../../assets/animation/85557-empty.json'

// 카테고리에 저장된 책 보여주기
function SavedBooksByCategory(props) {
  const [selectedBook, setSelectedBook] = useState([])
  const params = useParams()
  const navigate = useNavigate()
  /* 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
  토글 버튼을 활성화하고, 저장된 책 중 선택한 책을 state에 저장한다.
  중복 사용되는 함수로 재사용성을 위해 분리 필요*/

  const onClickBook = (e) => {
    const id = e.target.closest('li').id
    const book = props.filteredBooks[id] // 이부분만 다름
    props.handleToggle()
    setSelectedBook(book)
  }

  /* 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
  중복 사용되는 함수로 재사용성을 위해 분리 필요*/
  const handleModalClose = () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        props.handleToggle()
      }
    })
    window.addEventListener('click', (e) => {
      try {
        if (e.target.className === 'book-info') {
          props.handleToggle()
        }
        if (e.target.closest('button').className === 'close') {
          props.handleToggle()
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
    <section className='saved-book-list'>
      <div className='saved-book-list-header'>
        <button className='saved-book-back' onClick={() => navigate('/home/library')}>
          <i id='icon' className="fas fa-chevron-left"></i>
        </button>
        {props.userInfo.userName}님의 {option[params.category]} 목록 ({props.filteredBooks ? Object.keys(props.filteredBooks).length : 0}권)
      </div>
      {
        !props.filteredBooks || props.filteredBooks && props.filteredBooks.length === 0 ?
          <ShowMessage value={'저장하신 책이 없어요. 책 검색하기를 통해 책장을 채워주세요.'}
            animationData={animationData}
            width={'200px'}
            height={'200px'}
          />
          :
          Object.keys(props.filteredBooks).map((key, index) => {
            return (
              <>
                <ul className='book-list'>
                  <BookList key={index} book={props.filteredBooks[key]} index={index}
                    clickEvent={onClickBook} />
                </ul>
              </>)
          })
      }

      {
        props.isToggle ?
          <div className='book-info'>
            <div className='content-wrapper'>
              <BookBasicInfo selectedBook={selectedBook} />
              <SavedBookContents selectedBook={selectedBook}
                savedBooks={props.savedBooks}
                userInfo={props.userInfo}
                onClickUpdateOrAdd={props.onClickUpdateOrAdd}
                onClickDelete={props.onClickDelete}
                bookRepository={props.bookRepository}
              />
            </div>
          </div> : null
      }
    </section>
  )
}

export default SavedBooksByCategory