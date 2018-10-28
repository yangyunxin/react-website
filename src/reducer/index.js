import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import product from './product';
import order from './order';
import agent from './agent';

const rootReducer = combineReducers({
  auth,
  user,
  product,
  order,
  agent,
});

export default rootReducer;
