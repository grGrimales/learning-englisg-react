import { types } from "../type/types";

const initialState = {
  listCategory: [],
  listFiltered: [],
  showActivity: false,
  currentIndex: 0,
  activeWord: {},
};

export const vocabularyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.categoryList:
      return {
        ...state,
        listCategory: action.payload,
      };

    case types.listFiltered:
      return {
        ...state,
        listFiltered: action.payload,
      };

    case types.updateShowActivity:
      return {
        ...state,
        showActivity: action.payload,
      };

    case types.updateCurrentIndex:
      return {
        ...state,
        currentIndex: action.payload,
      };

    case types.updateActiveWord:
      return {
        ...state,
        activeWord: action.payload,
      };

    default:
      return state;
  }
};
