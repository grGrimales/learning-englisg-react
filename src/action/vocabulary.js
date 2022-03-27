import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../type/types";

export const getCategory = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("vocabulary/category-vocabulary");
    const body = await resp.json();

    let listCategory = body.categoryVocabulary;

    dispatch(getListCategory(listCategory));
  };
};

const getListCategory = (listCategory) => ({
  type: types.categoryList,
  payload: listCategory,
});
