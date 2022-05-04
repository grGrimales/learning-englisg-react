import { resolvePath } from "react-router-dom";
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

export const getListFilteredVocabulary = (order, category, limit) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `vocabulary?order=${order}&category=${category}&limit=${limit}`
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
      dispatch(listFilteredVocabulary(listFiltered.map((element) => {
        return {
          ...element,
          show: false
        }
      })));
      dispatch(updateShowActivity(true));
      dispatch(updateCurrentIndex(currentIndex));
      dispatch(updateActiveWord(listFiltered[currentIndex]));
    }
  };
};

export const nextActiveWord = (activeWord) => {
  return async (dispatch) => {

    // Si se manda el id se aumenta en uno el conteo
    if (activeWord.id) {
      try {
        const resp = await fetchConToken(
          `vocabulary/increase-number-reproductions/${activeWord.id}`,
          {},
          'PUT',

        );
        const body = await resp.json();

      } catch (error) {
        console.log(error)
      }
    }
    const currentIndex = parseInt(localStorage.getItem("currentIndex"));
    const listFiltered = JSON.parse(localStorage.getItem("listFiltered"));

    localStorage.setItem("activeWord", JSON.stringify(listFiltered[currentIndex]));
    dispatch(updateActiveWord(listFiltered[currentIndex]));
  };
};


export const setCurrentIndex = (currentIndex) => {
  return async (dispatch) => {
    localStorage.setItem("currentIndex", currentIndex);

    dispatch(updateCurrentIndex(currentIndex));


  }
}


export const updateCategoryRepasar = (id) => {
  return async (dispatch) => {

    const resp = await fetchConToken(
      `vocabulary/add-category-to-vocabulary/${id}`,
      {},
      'PUT',

    );
    const body = await resp.json();

    const listFiltered = JSON.parse(localStorage.getItem("listFiltered"));

    const updateListFiltered = listFiltered.map((vocabulary) => {
      if (vocabulary.id === id) {
        vocabulary.category = body.vocabulary.category
        return vocabulary
      } else {
        return vocabulary
      }
    })
    localStorage.setItem("listFiltered", JSON.stringify(updateListFiltered));

    dispatch(listFilteredVocabulary(updateListFiltered ? updateListFiltered : []));

  }
}

export const listFilteredVocabulary = (list) => ({
  type: types.listFiltered,
  payload: list,
});

export const updateShowActivity = (showActivity) => ({
  type: types.updateShowActivity,
  payload: showActivity,
});

const updateCurrentIndex = (currentIndex) => ({
  type: types.updateCurrentIndex,
  payload: currentIndex,
});

export const updateActiveWord = (activeWord) => ({
  type: types.updateActiveWord,
  payload: activeWord,
});
