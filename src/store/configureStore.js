import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import { createStore, applyMiddleware } from 'redux';

const create = applyMiddleware(thunk)(createStore)

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = (preState = {}) => {
  return create(rootReducer, preState, devTools)
}

export default configureStore;
