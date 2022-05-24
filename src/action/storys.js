import { fetchConToken } from "../helpers/fetch";
import { types } from "../type/types";

export const getStoryById = (id) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`story/${id}`);

        const { story } = await resp.json();

        dispatch(udateStory(story));
    }
}

export const getListStorys = () => {
    return async (dispatch) => {
        const resp = await fetchConToken("story");
        const { storys } = await resp.json();
        dispatch(updateStorysList(storys));
    }
}

// Actualiza la lista de historias en el store
const updateStorysList = (storys) => ({
    type: types.updateStorysList,
    payload: storys
});

const  udateStory = (story) => ({
    type: types.updateStory,
    payload: story

})