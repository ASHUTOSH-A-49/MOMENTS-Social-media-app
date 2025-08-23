import {CREATE,UPDATE,FETCH_ALL,DELETE,FETCH_BY_SEARCH} from '../constants/actionTypes'
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts:action.payload.data,
        currentPage:action.payload.currentPage,
        numberOfPages:action.payload.numberOfPages
      };
    case DELETE:
        return state.filter((post)=>post._id!==action.payload)
    case CREATE:
      return [...state, action.payload]; // old posts and add new

    case UPDATE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts:action.payload
      };

    default:
      return state;
  }
};
