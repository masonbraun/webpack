import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//import the application
import AppContainer from './containers/AppContainer';

import store from './store';

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);