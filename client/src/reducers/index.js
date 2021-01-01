const initialState = {
    input: {
        username: '', 
        email: '', 
        password: '', 
    }
}


export default (state = initialState, action) => {

    switch(action.type) {
        case "HANDLE_INPUT_CHANGE": 
            return {
                ...state, 
                input: {
                    ...state.input, 
                    [action.payload.name]: action.payload.input
                }
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
        default: 
            return state; 
    }
}