import actions from "./actions"

export const initialState = {
    user: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_USER_DETAILS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

