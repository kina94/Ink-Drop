import { deleteBookFromDB, saveBookToDB } from "../service/bookService";
const savedResultBooks = JSON.parse(localStorage.getItem("books"));

/* ------------ 액션 타입 --------------- */
const SELECT = "book/SELECT";
const GET = "book/GET";
const UPDATE_OR_ADD = "book/UPDATE_OR_ADD";
const DELETE = "book/DELETE";
const SEARCH = "book/SEARCH";
const INIT_BOOKS = "book/INIT_BOOKS";
const INIT_PARAMS = "book/INIT_PARAMS";
const SET_NEW_SEARCH_PAGE = "book/SET_NEW_SEARCH_PAGE";
const SET_PARAMS_QUERY = "book/SET_PARAMS_QUERY";
const SET_PARAMS_ALL = "book/SET_PARAMS_ALL";

/* ------------ 액션 생성 함수 ---------------*/
/*서재 및 검색 공통함수*/
export const getSelectedBook = (selectedBook) => ({
  type: SELECT,
  selectedBook,
});

/*서재 CRUD*/
export const setSavedBooks = (savedBooks) => ({
  type: GET,
  savedBooks,
});

export const onClickBookUpdateOrAdd = (userId, newBook) => ({
  type: UPDATE_OR_ADD,
  userId,
  newBookId: newBook.isbn,
  newBook,
});

export const onClickBookDelete = (bookId, userId) => ({
  type: DELETE,
  bookId,
  userId,
});

/*책 검색*/
export const getSearchBooks = (searchResultBooks) => ({
  type: SEARCH,
  searchResultBooks,
});

export const setNewSearchPage = () => ({
  type: SET_NEW_SEARCH_PAGE,
});

export const initSearchBooks = () => ({
  type: INIT_BOOKS,
});

export const initSearchParams = () => ({
  type: INIT_PARAMS,
});

export const setSearchParamsQuery = (query) => ({
  type: SET_PARAMS_QUERY,
  query,
});

export const setSearchParamsAll = (query, page) => ({
  type: SET_PARAMS_ALL,
  query,
  page,
});

/* ------------ 초기 상태 ---------------*/
const initBookState = {
  savedBooks: [],
  searchResultBooks: savedResultBooks ? savedResultBooks : [],
  searchParams: {
    query: "",
    page: 1,
  },
  selectedBook: [],
};

/* ------------ 리듀서 ---------------*/
export const bookReducer = (state = initBookState, action) => {
  switch (action.type) {
    /*검색 및 저장 공통 액션*/
    case SELECT:
      return { ...state, selectedBook: action.selectedBook };

    /*저장된 책 CRUD*/
    case GET:
      return { ...state, savedBooks: action.savedBooks };

    case DELETE: {
      const update = { ...state.savedBooks };
      const id = Object.keys(update).filter(
        (key) => update[key].isbn === action.bookId
      );
      delete update[id];
      deleteBookFromDB(action.userId, action.bookId);
      return { ...state, savedBooks: update };
    }

    case UPDATE_OR_ADD: {
      const update = { ...state.savedBooks };
      const id = Object.keys(update).filter(
        (key) => update[key].isbn === action.newBookId
      );
      update[id] = action.newBook;
      saveBookToDB(action.userId, action.newBookId, action.newBook);
      return { ...state, savedBooks: update };
    }

    /*책 검색 관련*/
    case SEARCH:
      return {
        ...state,
        searchResultBooks: [
          ...state.searchResultBooks,
          ...action.searchResultBooks,
        ],
      };
    case SET_NEW_SEARCH_PAGE:
      return { ...state, searchParams: { ...state.searchParams, page: 1 } };

    case INIT_BOOKS:
      return { ...state, searchResultBooks: [] };

    case INIT_PARAMS:
      return { ...state, searchParams: { query: "", page: 1 } };

    case SET_PARAMS_QUERY:
      return {
        ...state,
        searchParams: { ...state.searchParams, query: action.query },
      };

    case SET_PARAMS_ALL:
      return {
        ...state,
        searchParams: { query: action.query, page: action.page },
      };

    default:
      return state;
  }
};
