import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import product from './product';
import order from './order';

const rootReducer = combineReducers({
  auth,
  user,
  product,
  order,
});

export default rootReducer;
