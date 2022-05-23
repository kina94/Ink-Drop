import React, { useState } from 'react'

function BookInfo(props) {
  const { thumbnail, authors, contents, publisher, sale_price, title, url } = props.selectedBook
  const [selectedOption, setSelectedOption] = useState('complete')
  const onClickButton = (e) => {
    const id = e.target.id === selectedOption ? selectedOption : e.target.id
    setSelectedOption(id)
  }
  return (
    <div className='book-info'>
      <div className='content-wrapper'>
        <section className='title'>
          <span>{title}</span>
          <button className='close'><i className="fas fa-times"></i></button>
        </section>
        <section className='information'>
          <img src={thumbnail}></img>
          <p>{authors} / {publisher}</p>
          <hr></hr>
          <p>책 소개</p>
          <p>{contents}</p>
        </section>
        <section className='button-container'>
          <button id='complete'
            className={selectedOption === 'complete' ? 'active' : ''}
            onClick={onClickButton}
          >읽은 책</button>
          <button id='reading'
            className={selectedOption === 'reading' ? 'active' : ''}
            onClick={onClickButton}
          >읽고 있는 책</button>
          <button id='want'
            className={selectedOption === 'want' ? 'active' : ''}
            onClick={onClickButton}
          >읽고 싶은 책</button>
        </section>
        <section className='selected-display'>
          {
            selectedOption === 'complete' &&
            <>
            '독서기간'
            시작일 <input type='date'/>
            종료일 <input type='date'/>
            후기
            <input type='text' autoFocus/>
            </>
          }
          {
            selectedOption === 'reading' &&
            <>
            '독서시작일'
            <input type='date'/>
            '메모'
            <input type='text' autoFocus/>
            </>
          }
          {
            selectedOption === 'want' &&
            <>
            '메모'
            <input type='text' autoFocus/>
            </>
          }
        </section>
        <button>저장하기</button>
      </div>
    </div>
  )
}

export default BookInfo