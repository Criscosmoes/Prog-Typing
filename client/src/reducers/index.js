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
        default: 
            return state; 
    }
}