import {CREATE,UPDATE,FETCH_ALL,DELETE,FETCH_BY_SEARCH} from '../constants/actionTypes'
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case DELETE:
        return posts.filter((post)=>post._id!==action.payload)
    case CREATE:
      return [...posts, action.payload]; // old posts and add new

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_BY_SEARCH:
      return action.payload;

    default:
      return posts;
  }
};
