import {initToggle} from "./initActions"

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