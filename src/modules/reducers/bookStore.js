import {initBookActions} from "../actions/initActions";
import BookService from '../../service/book_service'

const bookService = new BookService()
const savedResultBooks = JSON.parse(localStorage.getItem('books'))

const initBookState = {
    savedBooks: [],
    searchResultBooks: savedResultBooks? savedResultBooks : [],
    searchParams: {
        query:'',
        page:1,
    },
    selectedBook: []
};

export const bookStore = (state = initBookState, action) => {
    switch (action.type) {
        /*검색 및 저장 공통 액션*/
        case initBookActions.SELECT:
            {
                return {...state , selectedBook: action.selectedBook}
            }

        /*저장된 책 CRUD*/
        case initBookActions.GET:
            {
                return { ...state, savedBooks: action.savedBooks }
            }

        case initBookActions.DELETE:
            {
                const update = { ...state.savedBooks }
                const id = Object.keys(update).filter(key => update[key].isbn === action.bookId)
                delete update[id]
                bookService.deleteBook(action.userId, action.bookId)
                return { ...state, savedBooks: update }
            }

        case initBookActions.UPDATE_OR_ADD:
            {
                const update = { ...state.savedBooks }
                const id = Object.keys(update).filter(key => update[key].isbn === action.newBookId)
                update[id] = action.newBook
                bookService.saveBook(action.userId, action.newBookId, action.newBook)
                return { ...state, savedBooks: update }
            }


        /*책 검색 관련*/
        case initBookActions.SEARCH:
            {
                return {...state, searchResultBooks:[...state.searchResultBooks, ...action.searchResultBooks]}
            }
        case initBookActions.SET_NEW_SEARCH_PAGE:
            {
                return {...state, searchParams:{...state.searchParams, page:1}}
            }

        case initBookActions.INIT_BOOKS:
            {
                return {...state, searchResultBooks:[]}
            }

        case initBookActions.INIT_PARAMS:
            {
                return {...state, searchParams:{query:'', page:1}}
            }

        case initBookActions.SET_PARAMS_QUERY:
            {
                return {...state, searchParams:{...state.searchParams, query:action.query}}
            }
        
        case initBookActions.SET_PARAMS_ALL:
            {
                return{...state, searchParams:{query:action.query, page:action.page}}
            }

        default:
            return state;
    }
}