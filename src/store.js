import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { connectRoutes } from 'redux-first-router';
import thunk from 'redux-thunk';

const history = createHistory();
const routes = {home: '/'};
const { reducer, middleware } = connectRoutes(history, routes);

import moviesReducer from './reducers/moviesReducer';

const store = createStore(
  combineReducers({location: reducer, movies: moviesReducer}),
  {},
  compose(applyMiddleware(thunk, middleware))
);

export default store;