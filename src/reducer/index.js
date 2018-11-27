import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import product from './product';
import order from './order';
import agent from './agent';
import skylight from './skylight';
import system from './system';
import productType  from './productType';

const rootReducer = combineReducers({
  auth,
  user,
  product,
  order,
  agent,
  skylight,
  system,
  productType,
});

export default rootReducer;
