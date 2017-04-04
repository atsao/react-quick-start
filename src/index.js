import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import routes from './routes';

const history = createBrowserHistory();

const app = (
  <Router history={history}>
    {routes}
  </Router>
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      {app}
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./routes', () => render());
}
