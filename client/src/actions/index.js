
export const handleInputChange = (name, input) => {


    return {
        type: "HANDLE_INPUT_CHANGE", 
        payload: {
            name, input
        }
    }
}

export const resetInputFields = () => {

    return {
        type: "RESET_INPUT", 
    }
}

// error messages
export const handleErrorMessages = (error) => {

    return {
        type: "HANDLE_ERROR_MESSAGES",
        payload: error, 
    }
}

export const resetErrorMessages = () => {

    return {
        type: "RESET_ERROR_MESSAGES", 
    }
}
export const checkButtonDisabled = valid => {

    return {
        type: "HANDLE_BUTTON_DISABLED", 
        payload: valid, 
    }
}

//user 
export const setCurrentUser = (id, name) => {

    return {
        type: "SET_CURRENT_USER", 
        payload: {
            id, name
        }
    }
}

export const saveErrorMessages = (name, value) => {
    
    return {
        type: "HANDLE_VALIDATION_ERRORS", 
        payload: {
            name, value
        }
    }


}

