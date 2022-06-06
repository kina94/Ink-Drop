import { initToggle } from "../actions/initActions"

const initToggleState = {
    modifyToggle : false,
    modalToggle : false,
}

export const toggleStore = (state=initToggleState, action) =>{
    switch(action.type){
        case initToggle.MODIFY_TOGGLE:
            {
                return {...state, modifyToggle:action.bool}
            }
        case initToggle.MODAL_TOGGLE:
            {
                return {...state, modalToggle:action.bool}
            }
        default:
            return state
    }
}