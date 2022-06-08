import {initBookActions, initToggle} from "./initActions"

export const bookActions = {
    /*서재 및 검색 공통함수*/
    getSelectedBook : (selectedBook)=>{
        return{
            type: initBookActions.SELECT,
            selectedBook,
        }
    },

    /*서재 CRUD*/
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

    /*책 검색*/
    getSearchBooks: (searchResultBooks) =>{
        return{
            type: initBookActions.SEARCH,
            searchResultBooks,
        }
    },

    setNewSearchPage: () =>{
        return{
            type:initBookActions.SET_NEW_SEARCH_PAGE
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

/*모달 관련*/
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