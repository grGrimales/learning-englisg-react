import { types } from "../type/types";



const initialState = {
    storys: null,
    storyActive: null
};


export const storyReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.updateStorysList:
            return {
                ...state,
                storys: action.payload
            }

        case types.updateStory:
            return {
                ...state,
                storyActive: action.payload
            }

        default:
            return state;
    }
}