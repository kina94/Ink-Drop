<div align="center">
  <h1> 📚 다독다독 (React) </h1>
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

## 리팩토링 기록 (Refactor branch에서 작업 중)
> ### 1차 리팩토링 (8.17 ~ 8.21)
> #### 1) 폴더 구조 리팩토링
> * Co-Location(함께 위치시키기)를 통해 응집도에 따라 연관된 코드 조각들을 가까운 위치에 배치시키는 방식으로 리팩토링했다. 재사용 컴포넌트가 아니라 각 페이지에서만 사용되는 컴포넌트는 pages에 관련된 컨테이너와 함께 위치시키고, 재사용되는 컴포넌트는 src/components 안으로 분리시켰다.
> * 변경 전 react-redux와 관련된 코드들을 modules 폴더에 action 폴더와 reducer 폴더로 분리해서 배치시켰는데 한 파일에 액션 함수와 리듀서를 모두 작성하는 덕스 패턴을 적용하여 폴더의 뎁스를 줄였다.

| 변경 전 | 변경 후 |
| :--- | :---: | 
| ![image](https://user-images.githubusercontent.com/66938939/185794378-fb877c3b-dafa-41a9-84fb-18ea196552d8.png) | ![image](https://user-images.githubusercontent.com/66938939/185794310-d8d25f9e-8ed2-4c9e-8496-2ca57c2fd37e.png) |

> #### 2) 컴포넌트의 재사용
> * Co-Location(함께 위치시키기)를 통해 응집도에 따라 연관된 코드 조각들을 가까운 위치에 배치시키는 방식으로 리팩토링했다. 재사용 컴포넌트가 아니라 각 페이지에서만 사용되는 컴포넌트는 pages에 관련된 컨테이너와 함께 위치시키고, 재사용되는 컴포넌트는 src/components 안으로 분리시켰다.
> * 변경 전 react-redux와 관련된 코드들을 modules 폴더에 action 폴더와 reducer 폴더로 분리해서 배치시켰는데 한 파일에 액션 함수와 리듀서를 모두 작성하는 덕스 패턴을 적용하여 폴더의 뎁스를 줄였다.
<hr/>
