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