import { combineReducers } from 'redux';
import main from './main';
import settings from './settings';

const rootReducer = combineReducers({
  main,
  settings
});

export default rootReducer;

