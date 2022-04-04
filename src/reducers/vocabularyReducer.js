import { types } from "../type/types";

const initialState = {
  listCategory: [],
  listFileteredVocabulary: [],
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
        listFileteredVocabulary: action.payload,
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

    // case types.pageDeleted:
    //   return {
    //     ...state,
    //     listadoPages: state.listadoPages.filter(
    //       (project) => project.id !== action.payload
    //     ),
    //   };

    // case types.pageUpdated:
    //   return {
    //     ...state,
    //     pagesEditar: action.payload,
    //   };
    default:
      return state;
  }
};
