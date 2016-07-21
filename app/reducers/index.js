//root reducer that is imported by store.js

import { combineReducers } from 'redux'

//import individual reducers
import posts from './posts'
import comments from './comments'



//this is representtaive of the STATE TREE
//combine the reducers

const rootReducer = combineReducers({
  posts,
  comments
})

//equivalent to above

// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }

export default rootReducer;
  