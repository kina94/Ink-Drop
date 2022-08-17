import React from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import {toggleActions } from '../../../../modules/actions'
import Rating from '../../common/rating/Rating'
import SaveOptionButton from '../search/SaveOptionButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// 카테고리에 저장된 책 보여주기
function SavedBooksByCategory(props) {
  const user = useSelector(store=>store.userReducer.user)
  const dispatch = useDispatch()
  const imModalShow = useSelector(store=>store.toggleStore.modalToggle)
  const navigate = useNavigate()
  const params = useParams()

  const getDday = (startDate) =>{
    const setStartDate = new Date(startDate)
    const now = new Date()
    const distance = now.getTime() - setStartDate.getTime()
    const day = Math.floor(distance / (1000 * 60 * 60 *24))
    return day+1
  }

  const switchTopInfo = (book) => {
    switch (book.type) {
      case 'complete':
        return (<>
          <span>평점</span>
          <Rating
            book={book}
            stars={book.rate}
            onClick={(e) => e.preventDefault()}
          ></Rating>
          <span>읽은 기간</span>
          {book.startDate.slice(0, 10)} ~ {book.endDate.slice(0, 10)}
        </>)
      case 'reading':
        return(<>
          <span>시작일</span>
          {book.startDate.slice(0, 10)}
          <span><FontAwesomeIcon icon='fa-book-open-reader'/></span>
          {getDday(book.startDate)}일차
        </>)
        default:
          return
    }
  }

  return (
    <section className='saved-book-list'>
      <div className= { imModalShow ? 'saved-book-list-header mobile-hide' : 'saved-book-list-header'}>
        <button className='saved-book-back' onClick={() => navigate('/home/library')}>
          <i id='icon' className="fas fa-chevron-left"></i>
        </button>
        {user.displayName}님의 {option[params.category]} 목록 ({props.filteredBooks ? Object.keys(props.filteredBooks).length : 0}권)
      </div>
      {
        !props.filteredBooks || props.filteredBooks.length === 0 ?
          <ShowMessage value={'책 검색하기를 통해 책장을 채워주세요.'}
            animationData={animationData}
            width={'200px'}
            height={'200px'}
          />
          :
          <ul className='book-list'>
            {
              Object.keys(props.filteredBooks).map((key, index) => {
                return (
                  <>
                    <div className='saved-book-top'>
                      <SaveOptionButton
                        name={option[props.filteredBooks[key].type]}
                        onClick={(e) => e.preventDefault()}
                      />
                      {
                        switchTopInfo(props.filteredBooks[key])
                      }
                    </div>
                    <BookList
                      key={index}
                      selectedBook={props.filteredBooks[key]}
                      index={index}/>
                  </>
                )
              })
            }
          </ul>
      }
      <Modal>
        <BookBasicInfo />
        <SavedBookContents/>
      </Modal>
    </section>
  )
}

export default SavedBooksByCategory