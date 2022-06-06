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
import Modal from '../../common/modal/Modal'
import { useDispatch } from 'react-redux'
import { toggleActions } from '../../../../modules/actions'

// 카테고리에 저장된 책 보여주기
function SavedBooksByCategory(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [selectedBook, setSelectedBook] = useState([])

  const onClickBook = (e) => {
    const id = e.target.closest('li').id
    const book = props.filteredBooks[id] // 이부분만 다름
    dispatch(toggleActions.toggleModal(true))
    setSelectedBook(book)
  }

  return (
    <section className='saved-book-list'>
      <div className='saved-book-list-header'>
        <button className='saved-book-back' onClick={() => navigate('/home/library')}>
          <i id='icon' className="fas fa-chevron-left"></i>
        </button>
        {props.userInfo.userName}님의 {option[params.category]} 목록 ({props.filteredBooks ? Object.keys(props.filteredBooks).length : 0}권)
      </div>
      {
        !props.filteredBooks || props.filteredBooks.length === 0 ?
          <ShowMessage value={'저장하신 책이 없어요. 책 검색하기를 통해 책장을 채워주세요.'}
            animationData={animationData}
            width={'200px'}
            height={'200px'}
          />
          :
          <ul className='book-list'>
            {
              Object.keys(props.filteredBooks).map((key, index) => {
                return (
                  <BookList
                    key={index}
                    book={props.filteredBooks[key]}
                    index={index}
                    clickEvent={onClickBook} />
                )
              })
            }
          </ul>
      }
      <Modal>
        <BookBasicInfo selectedBook={selectedBook} />
        <SavedBookContents
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          userInfo={props.userInfo}
        />
      </Modal>
    </section>
  )
}

export default SavedBooksByCategory