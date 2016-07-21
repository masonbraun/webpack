import { createStore, compose } from 'redux';

// import the root reducer
import rootReducer from './reducers/index';

//import the data
import comments from './data/comments';
import posts from './data/posts';

// create an object for the default data
const defaultState = {
  posts,
  comments
};

// const enhancers = compose(
//   window.devToolsExtension ? window.devToolsExtension)

const store = createStore(rootReducer, defaultState);

export default store;