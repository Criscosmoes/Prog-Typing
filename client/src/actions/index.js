

export const handleInputChange = e => {

    return {
        type: "HANDLE_INPUT_CHANGE", 
        payload: {
            name: e.target.name, 
            input: e.target.value
        }
    }
}

export const resetInputFields = () => {

    return {
        type: "RESET_INPUT", 
    }
}