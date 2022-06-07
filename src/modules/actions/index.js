import {initBookActions, initToggle} from "./initActions"

export const bookActions = {
    getSavedBooks: (savedBooks) =>{
        return{
            type: initBookActions.GET,
            savedBooks,
        }
    },

    onClickBookUpdateOrAdd: (userId, newBook) =>{
        return{
            type: initBookActions.UPDATE_OR_ADD,
            userId,
            newBookId: newBook.isbn,
            newBook
        }
    },

    onClickBookDelete: (bookId, userId) =>{
        return{
            type: initBookActions.DELETE,
            bookId,
            userId,
        }
    },

    getSearchBooks: (searchResultBooks) =>{
        return{
            type: initBookActions.SEARCH,
            searchResultBooks,
        }
    },

    initSearchBooks: () =>{
        return{
            type: initBookActions.INIT_BOOKS,
        }
    },

    initSearchParams: () =>{
        return{
            type: initBookActions.INIT_PARAMS
        }
    },

    setSearchParamsQuery: (query) =>{
        return{
            type:initBookActions.SET_PARAMS_QUERY,
            query
        }
    },

    setSearchParamsAll: (query, page) =>{
        return{
            type:initBookActions.SET_PARAMS_ALL,
            query,
            page,
        }
    }
}

export const toggleActions = {
    toggleModifyMode: (bool) =>{
        return{
            type:initToggle.MODIFY_TOGGLE,
            bool,
        }
    },

    toggleModal: (bool) =>{
        return{
            type:initToggle.MODAL_TOGGLE,
            bool,
        }
    }
}