import {initBookActions} from "../actions/initActions";
import BookService from '../../service/book_service'

const bookService = new BookService()

const initBookState = {
    savedBooks: []
};

export const bookStore = (state = initBookState, action) => {
    switch (action.type) {
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

        default:
            return state.savedBooks;
    }
}