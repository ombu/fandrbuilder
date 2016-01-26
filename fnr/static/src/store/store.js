/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistory } from 'react-router-redux';

export const history = createBrowserHistory();

const historyMiddleware = syncHistory(history);

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});


let createStoreWithMiddleware;

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware, historyMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware, historyMiddleware)
  )(createStore);
}


/**
 * Creates a preconfigured store.
 */
export function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  historyMiddleware.listenForReplays(store)

  return store;
}
