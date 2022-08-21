* [1. 적용 기술 및 라이브러리](#적용-기술-및-라이브러리)
* [2. 기능 영상](#기능)
* [3. 관련 기록](#관련-기록)
* [4. 리팩토링 기록 - Refactor branch에서 작업 중](#리팩토링-기록)

<div align="center">
  <h1> 📚 다독다독 (React) - ⚒ 리팩토링 중</h1>

자신이 읽은, 읽고 싶은, 읽는 중인 책을 관리하여 독서 습관을 기를 수 있는 반응형 웹 애플리케이션입니다.</br>
도서 검색, 옵션별 저장, 저장된 책 관리, 일별/월별/연도별 독서량을 확인할 수 있는 기능을 제공합니다. </br>

<a href='http://dadokdadok.netlify.app'>바로가기</a>

![스크린샷 2022-06-03 오전 12 46 06](https://user-images.githubusercontent.com/66938939/171669084-3b6d14f9-e133-4503-afbc-057630b879ad.png)
</div>

<hr/>

## 적용 기술 및 라이브러리
  * react hooks
  * react-router-dom
  * redux
  * lottie
  * react-chartjs2
  * react-calendar
  * react-bootstrap
  * fireabse
  * axios
  * infinite scrolling
  * Restful API

<hr/>

## 기능
  * 사용자별 서재 저장을 위한 구글 및 깃허브 로그인
  <img src='https://user-images.githubusercontent.com/66938939/172463198-230264e4-6140-4723-a8d6-548d1ec5aae5.gif' width=auto height=400px/>
  
  * 책 검색 (infinite scrolling)
  <img src='https://user-images.githubusercontent.com/66938939/172464067-babba6bf-2581-4edf-a9de-7300a8cf662b.gif' width=auto height=400px/>

  * 옵션별 책 저장
  <img src='https://user-images.githubusercontent.com/66938939/172464789-f2a8fb11-3892-4a21-ae96-92249521a896.gif' width=auto height=400px/>
  
  * 내 서재
  <img src='https://user-images.githubusercontent.com/66938939/172465351-1d6fe3bc-f492-4dec-a218-da3b23c8d62d.gif' width=auto height=400px/>
  
  * 저장한 책 관리 (수정/삭제)
  <img src='https://user-images.githubusercontent.com/66938939/172465974-e17b5a11-212e-4896-8920-dafa1a9996fb.gif' width=auto height=400px/>
  
  * 독서 차트 (연도별/월별/일별)
  <img src='https://user-images.githubusercontent.com/66938939/172466820-cafda8df-70bd-456b-8525-ab2377d773d2.gif' width=auto height=400px/>
  
  * 검색 기록 및 스크롤바 위치 캐싱 (메뉴 이동 및 새로고침 시 유지, 책 검색 두 번 클릭 시 초기화)
  <img src='https://user-images.githubusercontent.com/66938939/172467274-b48417d2-7e98-4e58-983a-5b78a0f89482.gif' width=auto height=400px/>
  
  * 반응형 구현
  <img src='https://user-images.githubusercontent.com/66938939/172468758-523f658b-00e8-4c46-a479-ffdfda7fb22f.gif'/>  

<hr/>


## 관련 기록
  * <a href='https://velog.io/@kina?tag=%EB%8B%A4%EB%8F%85%EB%8B%A4%EB%8F%85'>관련 기록</a>


## 리팩토링 기록
> Refactor Branch에서 작업 중
> ### 1차 리팩토링 (8.17 ~ 8.21)
> #### 1) 폴더 구조 리팩토링
> * Co-Location(함께 위치시키기)를 통해 응집도에 따라 연관된 코드 조각들을 가까운 위치에 배치시키는 방식으로 리팩토링했다. 재사용 컴포넌트가 아니라 각 페이지에서만 사용되는 컴포넌트는 pages에 관련된 컨테이너와 함께 위치시키고, 재사용되는 컴포넌트는 src/components 안으로 분리시켰다.
> * 변경 전 react-redux와 관련된 코드들을 modules 폴더에 action 폴더와 reducer 폴더로 분리해서 배치시켰는데 한 파일에 액션 함수와 리듀서를 모두 작성하는 덕스 패턴을 적용하여 폴더의 뎁스를 줄였다.

| 변경 전 | 변경 후 |
| :--- | :---: | 
| ![image](https://user-images.githubusercontent.com/66938939/185794378-fb877c3b-dafa-41a9-84fb-18ea196552d8.png) | ![image](https://user-images.githubusercontent.com/66938939/185794310-d8d25f9e-8ed2-4c9e-8496-2ca57c2fd37e.png) |

> #### 2) 컴포넌트의 재사용성 고려 및 styled-components 적용
> * 버튼, 모달, 별점, 책 카드 등 반복해서 사용되는 코드들이 있었다. 여기저기 반복되는 해당 코드들을 발라내서 재사용성을 고려하여 컴포넌트화시켰다.
> * styled-components를 차근차근 적용하고 있다. 추후 module.css 등 관련 css파일 삭제 예정이다.
```javascript
// 예시를 위한 일부 발췌 - 반복되는 버튼 컴포넌트
// SavedBookContents.jsx
<section className="save-contents">
  <section className="selected-display">
    {viewChangeByType(selectedBook.type)}
    <div className="button-container">
      <button
        className="modify"
        onClick={() => dispatch(toggleActions.toggleModifyMode(true))}
      >
        수정
      </button>
      <button className="delete" id={selectedBook.isbn} onClick={onClickDelete}>
        삭제
      </button>
    </div>
  </section>
</section>;

//SaveBook.jsx
<section className="selected-display">
  {selectedOptionContent()}
  <div className="button-container">
    <button className="save" type="submit" onClick={onClickSaveBook}>
      저장하기
    </button>
  </div>
</section>;
``` 

```javascript
//재사용 컴포넌트화
//Button.jsx
import React from "react";
import styled from "styled-components";

function Button(props) {
  const { children, variant, onClick } = props;
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  height: 100%;
  margin: 0 0 0 6px;
  width: 150px;
  background-color: ${(props) => {
    if (props.variant === "puple") {
      return "var(--color-blue);";
    }
    if (props.variant === "grey") {
      return "#708090;";
    }
  }};
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
```

> #### 3) 클래스형으로 작성된 API Service 코드 함수형으로 변경
> * 클래스형으로 작성되어 index에서부터 new를 사용하여 생성하고 props으로 내려보내주고 있던 api 관련 코드들을 함수형으로 리팩토링했다. 빵틀처럼 찍어낼 필요가 없고 필요한 곳에서 꺼내서 쓰기만 하면 되는 코드이기 때문에 굳이 클래스형으로 작성할 필요가 없다고 생각했다. 
```javascript
//Api 관련 코드 중 일부 발췌
//AuthService.js
import {firebaseAuth, githubProvider, googleProvider} from './firebase';

class AuthService{
    login(providerName){
        const authProvider= this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }

    onAuthChange(onUserChanged) {
        firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }

    logout(){
        firebaseAuth.signOut();
    }

    getProvider(providerName){
        switch(providerName){
            case 'Google' :
                return googleProvider;
            case 'Github' :
                return githubProvider;
            default:
                throw new Error(`not supported provider: ${providerName}`)
        }
    }
}

export default AuthService;
```

```javascript
//리팩토링 후
import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

export const onAuthChange = (onUserChanged) => {
  firebaseAuth.onAuthStateChanged((user) => {
    onUserChanged(user);
  });
};

export const logout = () => {
  firebaseAuth.signOut();
};

export const getProvider = (providerName) => {
  switch (providerName) {
    case "Google":
      return googleProvider;
    case "Github":
      return githubProvider;
    default:
      throw new Error(`not supported provider: ${providerName}`);
  }
};

export const login = (providerName) => {
  const authProvider = getProvider(providerName);
  return firebaseAuth.signInWithPopup(authProvider);
};
```

> #### 4) 마구잡이로 뭉쳐져 있던 로직들을 개별 함수로 분리
> * 하나의 함수는 하나의 역할만 해야하는데 한 함수에서 수많은 역할을 하고 있는 코드들이 다수 보였다. 심지어 자식 컴포넌트에서 사용해야 하는 함수인데 부모 컴포넌트부터 작성되어 props로 내려가고 있는 경우도 있었다. 유지보수가 힘들고 함수명만으로 어떤 역할을 하고 있는지 판단하기 어려운 뭉터기 코드들을 역할별로 조각내어 개별 함수로 분리시켰다.
```javascript
// 예시를 위한 일부 발췌
// 해당 코드는 현재 위치한 메뉴가 검색 메뉴일 때 검색 메뉴를 클릭하면 로컬 스토리지에 저장된 검색 기록을 모두 초기화하고,
// (검색 메뉴 두 번 연속 클릭 시 검색 기록 초기화)
// 다른 메뉴에 위치해 있을 때 검색 메뉴를 클릭하면 로컬 스토리지에 저장된 검색 기록과 스크롤바 위치를 가져오는 코드이다.
// (다른 메뉴에서 검색 메뉴로 이동 시 검색, 스크롤 기록 가져오기)
  const onClickSearchNav = () => {
    if (location.pathname.includes("search/")) {
      navigate("/home/search");
      LocalStorage.removeAllItems(); // 검색 기록 초기화
      document.querySelector("input").value = "";
    } else {
      dispatch(bookActions.initSearchParams());
      const savedParams = JSON.parse(localStorage.getItem("params"));
      const serachURL = savedParams
        ? `/home/search/${savedParams.query}`
        : "/home/search";
      navigate(serachURL); // 검색 기록 가져와서 URL 이동
    }
  };
```

```javascript
//리팩토링 후
  const navigate = useNavigate;
  const currentPath = useLocation().pathname;

  // 검색 메뉴 두 번 클릭 시 검색 기록 초기화
  const resetSavedSearchHistory = () => {
    removeAllLocalStorageItems();
    document.querySelector("input").value = "";
  };
  
  // 저장된 검색 기록 가져오기
  const getSavedSearchURL = (savedParams) => {
    const savedSearchURL = savedParams
      ? `/home/search/${savedParams.query}`
      : "/home/search";
    return savedSearchURL;
  };
  
  // 사이드바의 메뉴 클릭하면 이벤트를 호출하는 함수
  const handleSidebarClick = () => {
    if (currentPath.includes("search/")) { // 현재 위치가 검색 메뉴인 경우
      resetSavedSearchHistory(); // 검색 기록 초기화
      navigate("/home/search");
    } else { // 아닌 경우
      const savedParams = JSON.parse(localStorage.getItem("params"));
      navigate(getSavedSearchURL(savedParams)); // 저장된 검색 기록 불러오기
    }
  };
```
> * 무한 스크롤에서 How와 What을 구분했다. 리팩토링 전의 코드를 보면 해당 함수가 어떤 역할을 하는지 내부 구현 요소를 한 줄 한 줄 읽어야 이해할 수 있다. How에 해당하는 상세 구현부를 useInfiniteScrollEffect이란 함수로 따로 발라내고 컴포넌트에는 What에 해당하는 부분만 남겨 콜백함수로 구현했다. 무한 스크롤을 사용하는 컴포넌트인 SearchResults.jsx에서는 단순하게 useInfiniteScrollEffect를 사용하고 조건만 넘겨주면 간단하게 사용할 수 있다.

```javascript
// 리팩토링 전
const infiniteScroll = () => {
    if(!timeForThrottle){
        timeForThrottle=setTimeout(()=>{
            const scrollHeight = document.querySelector('.content').scrollHeight
            const scrollTop = document.querySelector('.content').scrollTop
            const clientHeight = document.querySelector('.content').clientHeight
            document.querySelector('.book-list') && localStorage.setItem('scroll', scrollTop)
            if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && scrollTop != 0) {
                addPageNum()
            }
            timeForThrottle=null
        },1000)
    }
}

useEffect(() => {
    document.querySelector('.content').addEventListener('scroll', infiniteScroll)
    return () => {
        document.querySelector('.content') && document.querySelector('.content').removeEventListener('scroll', infiniteScroll)
    }
})
```

```javascript
// 리팩토링 후
// How : useEffect, scrollHeight, scrollTop 등 상세 구현부
// What: addPageNum이 호출되는 조건

// src/utils/bookSearch.jsx (구현부)
import { useEffect } from "react";

export const isEndOfPage = (response) => {
  if (
    response.data.meta.is_end &&
    response.data.meta.pageable_count !== 0 &&
    document.querySelector(".content").scrollTop !== 0
  ) {
    return true;
  }
};

export const useInfiniteScrollEffect = (listner) => {
  const onScroll = () => {
    const scrollHeight = document.querySelector(".content").scrollHeight;
    const scrollTop = document.querySelector(".content").scrollTop; 
    const clientHeight = document.querySelector(".content").clientHeight; 
    document.querySelector('.book-list') && localStorage.setItem('scroll', scrollTop)
    listner(scrollHeight, scrollTop, clientHeight);
  };
  
  useEffect(() => {
    document.querySelector(".content").addEventListener("scroll", onScroll);
    return () => {
      document.querySelector(".content") &&
        document
          .querySelector(".content")
          .removeEventListener("scroll", onScroll);
    };
  });
};


// src/pages/search/components/SearchResults.jsx (호출부)
useInfiniteScrollEffect((scrollHeight, scrollTop, clientHeight) => {
    if (
      Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
      scrollTop !== 0
    ) {
      if (!timeForThrottle) {
        timeForThrottle = setTimeout(() => {
          addPageNum();
          timeForThrottle = null;
        }, 300);
      }
    }
  });
```
