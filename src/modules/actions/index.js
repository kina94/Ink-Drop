import initBookActions from "./actions"

const bookActions = {
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

export default bookActions