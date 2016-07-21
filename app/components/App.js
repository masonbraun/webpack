import React from 'react';

//import components

import Note from './Note/Note';

//import styles
import '../styles/reset.scss';
import '../styles/App.scss';

const App = ({posts, comments}) => (
  <div>
    {posts.map((post, i) => <Note key={i} test={post.caption} />)}
  </div>
)

export default App;

//presentational component has no lifecycle methods, and just returns UI
