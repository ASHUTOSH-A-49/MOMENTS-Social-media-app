import {CREATE,UPDATE,FETCH_ALL,DELETE,FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT} from '../constants/actionTypes'
export default (state = {isLoading:true,posts:[]}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state,isLoading:true}
    case END_LOADING:
      return {...state,isLoading:false}
    case FETCH_ALL:
      return {
        ...state,
        posts:action.payload.data,
        currentPage:action.payload.currentPage,
        numberOfPages:action.payload.numberOfPages
      };
    case DELETE:
        return {...state,posts:state.posts.filter((post)=>post._id!==action.payload)}
    case CREATE:
          // FIX: Correctly add the new post to the posts array
          return {...state, posts: [...state.posts, action.payload]};

    case UPDATE:
      return {...state,posts:state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )};
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts:action.payload
      };
    case FETCH_POST:
      return {
        ...state,
        post:action.payload
      };

    case COMMENT:
      return {
         ...state,
        post: action.payload, 
        posts: state.posts.map((post) => {
          if(post._id===action.payload._id){
            return action.payload
          }
          return post
        })
      }

    default:
      return state;
  }
};
