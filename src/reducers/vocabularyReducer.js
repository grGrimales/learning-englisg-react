import { types } from "../type/types";

const initialState = {
  listCategory: [],
};

export const vocabularyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.categoryList:
      return {
        ...state,
        listCategory: [action.payload],
      };

    // case types.pageList:
    //   return {
    //     ...state,
    //     listadoPages: [...action.payload],
    //   };

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
