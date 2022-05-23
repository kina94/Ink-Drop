import React, { useState } from 'react'
import OptionButton from './OptionButton'

function BookInfo(props) {
  const { thumbnail, authors, contents, publisher, sale_price, title, url } = props.selectedBook
  const option = {
    'complete' : '읽은 책',
    'reading' : '읽고 있는 책',
    'want' : '읽고 싶은 책'
  }
  const [selectedOption, setSelectedOption] = useState('complete')

  // 옵션 선택
  const onClickOption = (e) => {
    const id = e.target.id === selectedOption ? selectedOption : e.target.id
    setSelectedOption(id)
  }

  //선택된 옵션(읽은, 안 읽은, 읽고싶은)에 따른 하위 컨텐츠 리턴
  const selectedOptionContent = () =>{
    switch(selectedOption){
      case 'complete' :
        return(
          <>
          '독서기간'
          시작일 <input type='date'/>
          종료일 <input type='date'/>
          후기
          <input type='text' autoFocus/>
          </>
        )
      case 'reading' :
        return(
          <>
          '독서시작일'
          <input type='date'/>
          '메모'
          <input type='text' autoFocus/>
          </>
        )
      case 'want' :
        return(
          <>
          '메모'
          <input type='text' autoFocus/>
          </>
        )
    }
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
          <p>{contents}
          <a href={url} target='_blank'>더 보러가기</a>
          </p>
        </section>

        <section className='button-container'>
          {
            Object.keys(option).map((key,index)=>{
              return(
                <OptionButton key={index} option={key} name={option[key]}
                onClick={onClickOption} selectedOption={selectedOption}/>
              )
            })
          }
        </section>

        <section className='selected-display'>
          {selectedOptionContent()}
        </section>
        <button>저장하기</button>
      </div>
    </div>
  )
}

export default BookInfo