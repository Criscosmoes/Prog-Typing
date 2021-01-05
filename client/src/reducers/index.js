const initialState = {
    input: {
        username: '', 
        email: '', 
        password: '', 
    }, 

    currentUser: {
        id: "", 
        name: "", 
    }, 

    errorMessage: "", 

    errorMessages: {
        username: "", 
        email: "", 
        password: "", 
    }, 

    buttonDisabled: true, 
}


export default (state = initialState, action) => {

    switch(action.type) {
        case "HANDLE_INPUT_CHANGE": 
            return {
                ...state, 
                input: {
                    ...state.input, 
                    [action.payload.name]: action.payload.input
                }, 
                errorMessage: "", 
            }
        case "RESET_INPUT": 
            return {
                ...state, 
                input: {
                    username: '', 
                    email: '', 
                    password: '', 
                }
            }
        case "HANDLE_ERROR_MESSAGES": 
            return {
                ...state, 
                errorMessage: action.payload
            }
        case "SET_CURRENT_USER": 

            return {
                ...state, 
                currentUser: {
                    id: action.payload.id, 
                    name: action.payload.name, 
                }
            }
        case "HANDLE_VALIDATION_ERRORS": 
            return {
                ...state, 
                errorMessages: {
                    ...state.errorMessages, 
                    [action.payload.name]: action.payload.value, 
                }
            }
        case "HANDLE_BUTTON_DISABLED": 
            return {
                ...state, 
                buttonDisabled: action.payload
            }
        case "RESET_ERROR_MESSAGES": 
            return {
                ...state, 
                errorMessages: {
                    username: "", 
                    email: "", 
                    password: "", 
                }
            }
        default: 
            return state; 
    }
}