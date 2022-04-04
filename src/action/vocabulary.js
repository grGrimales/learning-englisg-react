import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../type/types";

export const getCategory = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("vocabulary/category-vocabulary");
    const body = await resp.json();

    let listCategory = body.categoryVocabulary.map((l) => {
      return {
        category: l,
        id: l,
      };
    });

    dispatch(getListCategory(listCategory));
  };
};

const getListCategory = (listCategory) => ({
  type: types.categoryList,
  payload: listCategory,
});

export const getListFilteredVocabulary = (order, category) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `vocabulary?order=${order}&category=${category}`
    );

    const body = await resp.json();

    if (body.ok) {
      const listFiltered = body.vocabularys;
      const currentIndex = 0;
      localStorage.setItem("listFiltered", JSON.stringify(listFiltered));
      localStorage.setItem("showActivity", "true");
      localStorage.setItem("currentIndex", currentIndex);
      localStorage.setItem(
        "activeWord",
        JSON.stringify(listFiltered[currentIndex])
      );
      dispatch(listFilteredVocabulary(listFiltered));
      dispatch(updateShowActivity(true));
      dispatch(updateCurrentIndex(currentIndex));
      dispatch(updateActiveWord(listFiltered[currentIndex]));
    }
  };
};

export const nextActiveWord = () => {
  return async (dispatch) => {
    const currentIndex = parseInt(localStorage.getItem("currentIndex")) + 1;
    const listFiltered = JSON.parse(localStorage.getItem("listFiltered"));

    localStorage.setItem(
      "activeWord",
      JSON.stringify(listFiltered[currentIndex])
    );

    localStorage.setItem("currentIndex", currentIndex);

    dispatch(updateCurrentIndex(currentIndex));
    dispatch(updateActiveWord(listFiltered[currentIndex]));
  };
};

const listFilteredVocabulary = (list) => ({
  type: types.listFiltered,
  payload: list,
});

export const updateShowActivity = (showActivity) => ({
  type: types.updateShowActivity,
  payload: showActivity,
});

export const updateCurrentIndex = (currentIndex) => ({
  type: types.updateCurrentIndex,
  payload: currentIndex,
});

export const updateActiveWord = (activeWord) => ({
  type: types.updateActiveWord,
  payload: activeWord,
});
