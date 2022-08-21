import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./Book.css";

// 책 기본 정보 보여주기
function BookInformation() {
  const selectedBook = useSelector((store) => store.bookReducer.selectedBook);
  let { thumbnail, authors, contents, publisher, title, url } = selectedBook;
  return (
    <BookInformationWrapper>
      <AuthDiv>
        <img src={thumbnail} alt="thumbnail"></img>
        <p>
          {authors && authors.join(" ")} / {publisher}
        </p>
      </AuthDiv>
      <InfoDiv>
        <p>책 소개</p>
        <p>{contents}</p>
        <p>
          <a id="link" href={url} target="_blank">
            더 보러가기
          </a>
        </p>
      </InfoDiv>
    </BookInformationWrapper>
  );
}

const BookInformationWrapper = styled.section`
  display: flex;
  flex-direction: row;
  @media screen and (max-height: 1400px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const AuthDiv = styled.div`
  padding-right: 30px;
  text-align: center;
  font-weight: bold;
  word-wrap: break-word;
  img {
    &:first-child {
      min-width: 200px;
      margin-bottom: 10px;
      border: 1px solid whitesmoke;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      @media screen and (max-height: 1400px) and (max-width: 1024px) {
        min-width: 100px;
      }
    }
  }
  @media screen and (max-height: 1400px) and (max-width: 1024px) {
    padding: 0;
  }
`;

const InfoDiv = styled.div`
  p {
    &:first-child {
      font-weight: bold;
    }
    &:nth-child(2) {
      margin-top: 5px;
      line-height: 30px;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default BookInformation;
