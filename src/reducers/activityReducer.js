import { types } from "../type/types";


const initialState = {
    typeOfactivity: null
};


export const activityReducer = (state = initialState, action) => {


    switch (action.type) {
        case types.updateKindActivy:
            
            return {
                ...state,
                typeOfactivity: action.payload
            }

        default:
            return state;
    }
}